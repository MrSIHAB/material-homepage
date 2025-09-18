import { TagOptions } from "../core/tag.js";
/**
 * Form options interface
 * @interface FormOptions
 * @extends TagOptions
 * @property {string} [method] - The HTTP method to use when submitting the form.
 * @property {string} [action] - The URL to which the form data will be submitted.
 * @property {string} [enctype] - The encoding type to use when submitting the form.
 * @property {string} [target] - The target window or frame to which the form will be submitted.
 * @property {string} [acceptCharset] - The character set to use for the form submission.
 * @property {boolean} [noValidate] - If true, the form will not be validated when submitted.
 * @property {string} [autoComplete] - The auto-complete behavior for the form.
 * @property {boolean} [autoFocus] - If true, the form will be focused when the page loads.
 * @property {string} [name] - The name of the form.
 * @property {function} [onSubmit] - The function to call when the form is submitted.
 * @property {function} [onReset] - The function to call when the form is reset.
 * @property {function} [onChange] - The function to call when the form is changed.
 * @property {function} [onInput] - The function to call when the form is inputted.
 * @property {function} [onInvalid] - The function to call when the form is invalid.
 */
export interface FormOptions extends TagOptions {
    method?: HTMLFormElement["method"];
    action?: HTMLFormElement["action"];
    enctype?: HTMLFormElement["enctype"];
    target?: HTMLFormElement["target"];
    acceptCharset?: HTMLFormElement["acceptCharset"];
    noValidate?: boolean;
    autoComplete?: HTMLFormElement["autocomplete"];
    autoFocus?: boolean;
    name?: string;
    onSubmit?: (event: SubmitEvent) => void;
    onReset?: (event: Event) => void;
    onChange?: (event: Event) => void;
    onInput?: (event: Event) => void;
    onInvalid?: (event: Event) => void;
}
/**
 * Creates a form element with the specified options.
 * @param {FormOptions} options - The options for the form element.
 * @return {HTMLFormElement} The created form element.
 * @example
 * const form = Form({
 *     method: "POST",
 *     action: "/submit",
 *     enctype: "application/x-www-form-urlencoded",
 *     target: "_self",
 *     acceptCharset: "UTF-8",
 *     noValidate: false,
 *     autoComplete: "on",
 *     autoFocus: true,
 *     name: "myForm",
 *     onSubmit: onSubmit,
 *     onReset: onReset,
 *     onChange: onChange,
 *     onInput: onInput,
 *     onInvalid: onInvalid,
 *     id: "signin-form"
 *     ... : ...other options
 * });
 */
export declare const Form: (options: FormOptions) => HTMLFormElement;
/**
 * Input options interface
 * @interface InputOptions
 * @extends TagOptions
 */
export interface InputOptions extends TagOptions {
    type?: HTMLInputElement["type"];
    name?: HTMLInputElement["name"];
    value?: HTMLInputElement["value"];
    placeholder?: HTMLInputElement["placeholder"];
    required?: boolean;
    readOnly?: boolean;
    min?: HTMLInputElement["min"];
    max?: HTMLInputElement["max"];
    minLength?: HTMLInputElement["minLength"];
    maxLength?: HTMLInputElement["maxLength"];
    pattern?: HTMLInputElement["pattern"];
    size?: HTMLInputElement["size"];
    step?: HTMLInputElement["step"];
    autoComplete?: HTMLInputElement["autocomplete"];
    autoFocus?: boolean;
    accept?: HTMLInputElement["accept"];
    onInput?: (event: Event) => void;
    onInvalid?: (event: Event) => void;
    onSelect?: (event: Event) => void;
}
/**
 * Creates an input element with the specified options.
 * @param {InputOptions} options - The options for the input element.
 * @return {HTMLInputElement} The created input element.
 * @example
 * const input = Input({
 *     type: "text",
 *     name: "username",
 *     value: "JohnDoe",
 *     placeholder: "Enter your username",
 *     required: true,
 *     disabled: false,
 *     readOnly: false,
 *     min: "1",
 *     max: "100",
 *     minLength: 3,
 *     maxLength: 20,
 *     pattern: "[a-zA-Z0-9]+",
 *     size: 20,
 *     step: 1,
 *     autoComplete: "on",
 *     autoFocus: true,
 *     accept: ".txt",
 *     onChange: onChange,
 *     onInput: onInput,
 *     onInvalid: onInvalid,
 *     onFocus: onFocus,
 *     onBlur: onBlur,
 *     onSelect: onSelect,
 *     id: "username-input"
 *     ... : ...other options
 * });
 */
export declare const Input: (options: InputOptions) => HTMLInputElement;
/**
 * TextArea options interface
 * @interface TextAreaOptions
 * @extends TagOptions
 */
export interface TextAreaOptions extends TagOptions {
    name?: HTMLTextAreaElement["name"];
    value?: HTMLTextAreaElement["value"];
    placeholder?: HTMLTextAreaElement["placeholder"];
    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    rows?: HTMLTextAreaElement["rows"];
    cols?: HTMLTextAreaElement["cols"];
    wrap?: HTMLTextAreaElement["wrap"];
    maxLength?: HTMLTextAreaElement["maxLength"];
    autoComplete?: HTMLTextAreaElement["autocomplete"];
    autoFocus?: boolean;
    onInput?: (event: Event) => void;
    onInvalid?: (event: Event) => void;
}
/**
 * Creates a textarea element with the specified options.
 * @param {TextAreaOptions} options - The options for the textarea element.
 * @return {HTMLTextAreaElement} The created textarea element.
 * @example
 * const textarea = TextArea({
 *      name: "description",
 *      value: "Enter your description here",
 *      placeholder: "Description",
 *      required: true,
 *      disabled: false,
 *      readOnly: false,
 *      rows: 5,
 *      cols: 40,
 *      wrap: "soft",
 *      maxLength: 500,
 *      autoComplete: "on",
 *      autoFocus: true,
 *      onChange: onChange,
 *      onInput: onInput,
 *      onInvalid: onInvalid,
 *      onFocus: onFocus,
 *      onBlur: onBlur,
 *      id: "description-textarea"
 *      style: {color: blue}
 *      ... : ...other options
 */
export declare const TextArea: (option: TextAreaOptions) => HTMLTextAreaElement;
/**
 * Label options interface
 * @interface LabelOptions
 * @extends TagOptions
 */
export interface LabelOptions extends TagOptions {
    for?: HTMLLabelElement["htmlFor"];
    autoFocus?: boolean;
    onFocus?: (event: FocusEvent) => void;
}
/**
 * Creates a label element with the specified options.
 * @param {LabelOptions} options - The options for the label element.
 * @return {HTMLLabelElement} The created label element.
 * @example
 * const label = Label({
 *      for: "username",
 *      childs: Input({id: "username", type: "text", name: "username"}),
 *      autoFocus: true,
 *      onFocus: onFocus,
 *      onBlur: onBlur,
 *      id: "username-label"
 *      ... : ...other options
 * });
 */
export declare const Label: (options: LabelOptions) => HTMLLabelElement;
export interface SelectInterface extends TagOptions {
    childs?: undefined;
    name: HTMLSelectElement["name"];
    value?: HTMLSelectElement["value"];
    required?: boolean;
    disabled?: boolean;
    size?: HTMLSelectElement["size"];
    multiple?: boolean;
    autoFocus?: boolean;
    options?: Array<HTMLOptionElement | HTMLOptGroupElement>;
    selectedIndex?: number;
    onInput?: (event: Event) => void;
    onInvalid?: (event: Event) => void;
    onFocus?: (event: FocusEvent) => void;
    onSelect?: (event: Event) => void;
}
/**
 * Option options interface
 * @interface OptionOptions
 * @extends TagOptions
 */
export interface OptionInterface extends TagOptions {
    value?: HTMLOptionElement["value"];
    label?: HTMLOptionElement["label"];
    selected?: boolean;
    disabled?: boolean;
    defaultSelected?: boolean;
    autoFocus?: boolean;
    onInput?: (event: Event) => void;
    onInvalid?: (event: Event) => void;
    onFocus?: (event: FocusEvent) => void;
    for: string;
}
/**
 * Creates an option element with the specified options.
 * @param {OptionOptions} options - The options for the option element.
 * @return {HTMLOptionElement} The created option element.
 * @example
 * const option = Option({
 *      value: "1",
 *      label: "Option 1",
 *      selected: true,
 *      disabled: false,
 *      defaultSelected: false,
 *      autoFocus: true,
 *      onChange: onChange,
 *      onInput: onInput,
 *      onInvalid: onInvalid,
 *      onFocus: onFocus,
 *      onBlur: onBlur,
 *      for: "option-1",
 * });
 */
export declare const Option: (options: OptionInterface) => HTMLOptionElement;
/**
 * Creates an optgroup element with the specified options.
 * @param {OptionInterface} options - The options for the optgroup element.
 * @return {HTMLOptGroupElement} The created optgroup element.
 * @example
 * const optgroup = OptGroup({
 *      label: "Group 1",
 *      disabled: false,
 *      autoFocus: true,
 *      onChange: onChange,
 *      onInput: onInput,
 *      onInvalid: onInvalid,
 *      onFocus: onFocus,
 *      onBlur: onBlur,
 * });
 */
export declare const OptGroup: (options: OptionInterface) => HTMLOptGroupElement;
