
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