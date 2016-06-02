import Parchment from 'parchment'
import Quill from 'quill'
const Module = Quill.imports['core/module']
const CodeBlock = Quill.imports['formats/code-block']

class SyntaxCodeBlock extends CodeBlock {
    static create(value) {
        let domNode = super.create(value);
        if (typeof value === 'string') {
            domNode.dataset.language = value;
        } else {
            domNode.dataset.language = SyntaxCodeBlock.DEFAULT_LANGUAGE;
        }
        domNode.classList.add(domNode.dataset.language);
        return domNode;
    }

    static formats(domNode) {
        return domNode.dataset.language || SyntaxCodeBlock.DEFAULT_LANGUAGE;
    }

    format(name, value) {
        if (name === this.statics.blotName && !value) {
            this.domNode.textContent = this.domNode.textContent;
            this.attach();
        }
        super.format(name, value);
    }

    highlight(highlight) {
        if (this.cachedHTML !== this.domNode.innerHTML) {
            let text = this.domNode.textContent;
            if (text.trim().length > 0 || this.cachedHTML == null) {
                this.domNode.textContent = text;
                highlight(this.domNode);
                this.attach();
            }
            this.cachedHTML = this.domNode.innerHTML;
        }
    }
}

SyntaxCodeBlock.DEFAULT_LANGUAGE = 'javascript';

class Syntax extends Module {
    constructor(quill, options) {
        super(quill, options);
        if (typeof this.options.highlight !== 'function') {
            throw new Error('Syntax module requires highlight.js. Please include the library on the page.');
        }
        if(options.language){
            //SyntaxCodeBlock.DEFAULT_LANGUAGE = options.language;
        }

        Quill.register(SyntaxCodeBlock, true);

        let timer = null;
        this.quill.on(Quill.events.SCROLL_OPTIMIZE, () => {
            if (timer != null) return;
            timer = setTimeout(() => {
                this.highlight();
                timer = null;
            }, 100);
        });
        this.highlight();
    }

    highlight() {
        let range = this.quill.getSelection();
        this.quill.scroll.descendants(SyntaxCodeBlock).forEach((code) => {
            code.highlight(this.options.highlight);
        });
        this.quill.update(Quill.sources.SILENT);
        if (range != null) {
            this.quill.setSelection(range, Quill.sources.SILENT);
        }
    }
}

Syntax.DEFAULTS = {
    highlight: (window.hljs != null ? window.hljs.highlightBlock: null)
};


export { SyntaxCodeBlock as CodeBlock, Syntax as default};
