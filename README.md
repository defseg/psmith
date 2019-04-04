# What is Psmith?

Psmith is a search tool for the [PHOIBLE](https://phoible.org) linguistic database. It lives [here](https://defseg.io/psmith).

# Which version of PHOIBLE does Psmith use?

The [CLLD release](https://github.com/clld/phoible), for now; soon it will use PHOIBLE 2.0.

# How do I write a search query?

A search query is minimally composed of a search term. There are two types of search term.

A *phoneme term* consists of a phoneme enclosed in forward slashes, optionally preceded by `no`. This will find all doculects that have (or don't have, if there's a preceding `no`) the given phoneme.

For example, `/t̪ʙ/` will return all doculects that contain the phoneme represented in PHOIBLE by the text string `t̪ʙ`, and `no /m/` will return all doculects that do not contain the phoneme represented in PHOIBLE by the text string `m`.

A *feature term* consists of a number (optionally preceded by a `<` or `>` sign), a space, and a string of pluses and minuses followed (with no intervening space) by the name of the feature to search. For example, `2 +coronal` will return all doculects with exactly two [+coronal] segments, and `>30 +syllabic` will return all doculects with more than thirty syllabic segments.

For the numeric component of the feature term, `no` can be used to mean `0`, and `any` can be used to mean `>0`.

To search for multiple feature values on the same phoneme, separate the feature components with a semicolon. For example, `any +syllabic;+consonantal` will return a list of doculects with syllabic consonants.

To limit the search to languages with specific properties, use `field:value` syntax. To limit the search to languages without specific properties, use `!field:value`. Values are case-insensitive. For example, `country:australia` will return all doculects that PHOIBLE lists as spoken in Australia. Spaces in the value must be replaced with underscores, as in `country:united_states`. The available fields are:

- `source`: The contributor of the inventory.
- `language_code`: The ISO 639-3 code of the language.
- `language_name`: The name of the language according to the source.
- `language_family_root`: A four-character abbreviation for the language family or non-cladistic category, out of a set of 107.
- `language_family_genus`: The name of the language genus; e.g. Romance, Munda, Semitic, Samoyedic.
- `country`: The country in which the language is spoken. Territorially disjunct autonomous constituents (e.g. New Caledonia, Greenland, Guam) are treated as their own countries, but territorially disjunct regions (e.g. Hawaii, French Guiana, Kaliningrad) are not.
- `area`: One of the following five values: Africa, America, Asia, Europe, Pacific.
- `population`: A population estimate for the language.
- `latitude`, `longitude`: Coordinates for a location in which the language is spoken.

Search terms may be joined by the logical operators `and` and `or`. These are postfix.
