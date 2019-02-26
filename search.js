(function () {
if (typeof window.Psmith === 'undefined') window.Psmith = {};

var psherlock = window.Psmith.psherlock = {}

psherlock.Query = function(contains=true, term='', num=null, gtlt='=') {
    this.contains = contains;
    this.term = term;
    this.num = num;
    this.gtlt = gtlt;
    this.kind = 'query';
}

psherlock.PropertyQuery = function(prop_name, prop_value, contains=true) {
    // Queries on the table `languages` instead of `segments`.
    this.prop_name = prop_name;
    this.prop_value = prop_value;
    this.contains = contains;
    this.kind = 'propertyquery';
}

psherlock.QueryTree = function (left, relation, right) {
    this.left = left;
    this.relation = relation;
    this.right = right;
    this.kind = 'tree';
}

psherlock.SearchError = class SearchError extends Error {};

psherlock.search = function (qtree) {
    var res = db.exec(build_sql(qtree));
    return res;
}

psherlock.get_inventory = function (id) {
    return db.exec(`
        SELECT segments.*
        FROM languages 
        JOIN language_phonemes ON languages.id = language_phonemes.language_id
        JOIN phonemes ON language_phonemes.phoneme_id = phonemes.id
        JOIN segments ON phonemes.phoneme = segments.segment
        WHERE languages.id = ${id};`)[0];
}

psherlock.get_language_info = function (id) {
    return db.exec(`SELECT * FROM languages WHERE languages.id = ${id}`)[0];
}

// -----------
// -- utils --
// -----------

psherlock.indexify = function (results) {
    return _indexify(results.values, build_indices(results));
}

psherlock.indexify = function (results) {
    var values = results.values;
    var indices = psherlock.build_indices(results);
    var new_results = [];
    for (let res of values) {
        var new_res = {};
        for (let index in indices) {
          new_res[index] = res[indices[index]];
        }
        new_results.push(new_res);
    }
    return new_results;
}

psherlock.build_indices = function (results) {
    var indices = {};
    for (let i = 0; i < results.columns.length; i++) {
        indices[results.columns[i]] = i;
    }
    return indices;
}

// -------------
// -- private --
// -------------

function build_sql(qtree) {
    // We go through the query tree twice - first to pull all the contains queries
    // so we can display the phonemes, and then to generate the actual SQL.
    // The actual SQL is generated in get_sql().
    var phoneme_conditions = build_phoneme_conditions(qtree)

    // Special case: don't return any phonemes if it's an entirely negative query
    // (because otherwise you're returning the entire inventory of the doculect)
    function is_negative(q) {
        if (q.kind === 'tree') {
            return is_negative(q.left) && is_negative(q.right);
        } else {
            return !is_contains(q);
        }
    }
    var do_phonemes = 'phonemes.phoneme';
    if (is_negative(qtree)) do_phonemes = false;

    return `
        SELECT languages.id, languages.language_name, languages.source, languages.language_code${do_phonemes ? ', ' + do_phonemes : ''}
        FROM languages
        JOIN language_phonemes ON languages.id = language_phonemes.language_id
        JOIN phonemes ON language_phonemes.phoneme_id = phonemes.id
        JOIN segments ON phonemes.phoneme = segments.segment
        WHERE ${get_sql(qtree)} ${phoneme_conditions && do_phonemes ? 'AND (' + phoneme_conditions + ')' : ''}
        ORDER BY languages.id
        ;`;
}

function build_phoneme_conditions(qtree) {
    var query_stack = [];
    var contains_queries = [];
    function process_node(node) {
        if (node.kind === 'tree') {
            query_stack.push(node.left);
            query_stack.push(node.right);
        } else if (node.kind === 'query') {
            if (is_contains(node)) {
                contains_queries.push(phoneme_condition(node.term));
            }
        } else if (node.kind === 'propertyquery') {
            // do nothing
        } else {
            throw new Psmith.psherlock.SearchError(`Bad query tree term ${node}`);
        }
    }
    process_node(qtree);
    while (query_stack.length > 0) {
        process_node(query_stack.pop());
    }
    return contains_queries.join(' OR ');
}

function phoneme_condition(term) {
    if (typeof(term) === 'object') {
        var arr = [];
        for (let k in term) {
            arr.push(`segments.${k} = '${term[k]}'`);
        }
        return arr.join(' AND ');
    } else if (typeof(term) === 'string') {
        return `phonemes.phoneme LIKE '${term}'`;
    } else {
        throw new Psmith.psherlock.SearchError(`Bad phoneme condition ${term}`);
    }
}

function contains_query(term, num=null, gtlt='=') {
    var term_cond = phoneme_condition(term);
    var num_cond = '';

    if (num !== null) {
        num_cond = `HAVING count(*) ${gtlt} ${num}`;
    }

    return `languages.id IN (
        SELECT languages.id
        FROM languages
            JOIN language_phonemes ON languages.id = language_phonemes.language_id
            JOIN phonemes ON language_phonemes.phoneme_id = phonemes.id
            JOIN segments ON phonemes.phoneme = segments.segment
            WHERE ${term_cond}
            GROUP BY languages.id
            ${num_cond}
        )`;
}

function does_not_contain_query(term) {
    var term_cond = phoneme_condition(term);
    return `
        languages.id NOT IN
        (SELECT languages.id
        FROM languages
            JOIN language_phonemes ON languages.id = language_phonemes.language_id
            JOIN phonemes ON language_phonemes.phoneme_id = phonemes.id
            JOIN segments ON phonemes.phoneme = segments.segment
        WHERE ${term_cond}
        GROUP BY languages.id
        )`;
}

function prop_query(term) {
    return `
        languages.id ${term.contains ? '' : 'NOT'} IN (
            SELECT languages.id 
            FROM languages 
            WHERE UPPER(${term.prop_name}) = UPPER('${term.prop_value}')
        )`;
}

function get_sql(q) {
    if (q.kind === 'tree') {
        return `(${get_sql(q.left)} ${q.relation} ${get_sql(q.right)})`;
    }
    if (q.kind === 'query') {
        if (is_contains(q)) {
            return contains_query(q.term, q.num, q.gtlt);
        } else {
            return does_not_contain_query(q.term);
        }
    }
    if (q.kind === 'propertyquery') {
        return prop_query(q);
    }
}

function is_contains(q) {
    return q.contains || q.gtlt === '<';
}

})();