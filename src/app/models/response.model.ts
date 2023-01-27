import { Deserializable } from './deserializable.model';

export class Response implements Deserializable {
    data!: Array<any>

    deserialize(input: any): this {
        return Object.assign(this, input);
    }
}
