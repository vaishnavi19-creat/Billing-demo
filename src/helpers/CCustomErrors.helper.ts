import { type } from "os";
import { errorTypeEnum } from "../enums/errorType.enum";

export class CCustomErrors extends Error {

    public status : number = 500;
    public reasons : {};
    public errorStack : {};

    constructor ( error : Error, errorType : errorTypeEnum | number,  reasons?:{} ) {

        super();

        if( errorType == errorTypeEnum.INPUT_VALIDATION_ERROR ) {
            this.message = 'Please provide the valid inputs. ';
            this.reasons = reasons ? { ...reasons } : error['reasons'] ? { ...error['reasons']} : { ...[]};
        } else {
            this.message = error.message || 'Something went wrong. ';
        }

        this.errorStack = { ...error };
        this.status = errorType;

        return this;
    }
}