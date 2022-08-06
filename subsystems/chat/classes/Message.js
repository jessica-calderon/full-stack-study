const filter = require("../filter")

class Message {
    owner;
    contentType = "text"; //TODO: Add support for other types such as gif or image. 
    content;

    constructor(owner, content) {
        this.owner = owner;
        this.content = filter.filterString(content);
    }

    export() {
        return {
            owner: this.owner.export(),
            contentType: this.contentType,
            content: this.content
        }
    }
}

module.exports = Message;