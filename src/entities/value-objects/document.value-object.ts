export class Document {
    private document: string;
    private readonly CPF_SIZE = 11;

    constructor(document: string) {
        this.document = this.formatDocument(document);
    }

    private formatDocument(document: string) {
        if (!document) throw new Error('Invalid Document', { cause: 'Validation Error' });

        return document.replaceAll(/[.\-/]/g, '');
    }

    private cpfFormat(value: string) {
        return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    getDocument() {
        if (this.document.length == this.CPF_SIZE) return this.cpfFormat(this.document);

        return this.document;
    }
}
