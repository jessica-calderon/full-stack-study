
/*
    filter.js
    Harrison L. (@Stratiz)
    Created on 08/06/2022 @ 05:46:31
    
    Description:
        Filters the content of a message.
    
    Documentation:
        .filterString(string : string) : string
        -> Filters the string and returns the filtered string.
*/


const fitleredStrings = [
    'testfilter',
];

module.exports = {
    filterString: function(string) {
        for (let index in fitleredStrings) {
            if (string.includes(fitleredStrings[index])) {
                return '****';
            }
        }
        return string;
    }
}