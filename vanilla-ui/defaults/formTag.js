import { Tag } from "../core/tag.js";
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
export const Form = (options) => {
    const formTag = Tag("form", options);
    const { method, action, enctype, target, acceptCharset, noValidate, autoComplete, autoFocus, name, } = options;
    if (method)
        formTag.method = method;
    if (action)
        formTag.action = action;
    if (enctype)
        formTag.enctype = enctype;
    if (target)
        formTag.target = target;
    if (acceptCharset)
        formTag.acceptCharset = acceptCharset;
    if (noValidate)
        formTag.noValidate = noValidate;
    if (autoComplete)
        formTag.autocomplete = autoComplete;
    if (autoFocus)
        formTag.autofocus = autoFocus;
    if (name)
        formTag.name = name;
    if (options.onSubmit)
        formTag.addEventListener("submit", options.onSubmit);
    if (options.onReset)
        formTag.addEventListener("reset", options.onReset);
    if (options.onChange)
        formTag.addEventListener("change", options.onChange);
    if (options.onInput)
        formTag.addEventListener("input", options.onInput);
    if (options.onInvalid) {
        formTag.addEventListener("invalid", options.onInvalid);
    }
    return formTag;
};
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
export const Input = (options) => {
    const inputTag = Tag("input", options);
    const { type, name, value, placeholder, required, disabled, readOnly, min, max, minLength, maxLength, pattern, size, step, autoComplete, autoFocus, accept, } = options;
    if (type)
        inputTag.type = type;
    if (name)
        inputTag.name = name;
    if (value)
        inputTag.value = value;
    if (placeholder)
        inputTag.placeholder = placeholder;
    if (required)
        inputTag.required = required;
    if (disabled)
        inputTag.disabled = disabled;
    if (readOnly)
        inputTag.readOnly = readOnly;
    if (min)
        inputTag.min = min;
    if (max)
        inputTag.max = max;
    if (minLength)
        inputTag.minLength = minLength;
    if (maxLength)
        inputTag.maxLength = maxLength;
    if (pattern)
        inputTag.pattern = pattern;
    if (size)
        inputTag.size = size;
    if (step)
        inputTag.step = step;
    if (autoComplete)
        inputTag.autocomplete = autoComplete;
    if (autoFocus)
        inputTag.autofocus = autoFocus;
    if (accept)
        inputTag.accept = accept;
    if (options.onChange)
        inputTag.addEventListener("change", options.onChange);
    if (options.onInput)
        inputTag.addEventListener("input", options.onInput);
    if (options.onInvalid) {
        inputTag.addEventListener("invalid", options.onInvalid);
    }
    if (options.onBlur)
        inputTag.addEventListener("blur", options.onBlur);
    if (options.onSelect)
        inputTag.addEventListener("select", options.onSelect);
    return inputTag;
};
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
export const TextArea = (option) => {
    const textAreaTag = Tag("textarea", option);
    const { name, value, placeholder, required, disabled, readOnly, rows, cols, wrap, maxLength, autoComplete, autoFocus, } = option;
    if (name)
        textAreaTag.name = name;
    if (value)
        textAreaTag.value = value;
    if (placeholder)
        textAreaTag.placeholder = placeholder;
    if (required)
        textAreaTag.required = required;
    if (disabled)
        textAreaTag.disabled = disabled;
    if (readOnly)
        textAreaTag.readOnly = readOnly;
    if (rows)
        textAreaTag.rows = rows;
    if (cols)
        textAreaTag.cols = cols;
    if (wrap)
        textAreaTag.wrap = wrap;
    if (maxLength)
        textAreaTag.maxLength = maxLength;
    if (autoComplete)
        textAreaTag.autocomplete = autoComplete;
    if (autoFocus)
        textAreaTag.autofocus = autoFocus;
    if (option.onChange) {
        textAreaTag.addEventListener("change", option.onChange);
    }
    if (option.onInput)
        textAreaTag.addEventListener("input", option.onInput);
    if (option.onInvalid) {
        textAreaTag.addEventListener("invalid", option.onInvalid);
    }
    if (option.onBlur)
        textAreaTag.addEventListener("blur", option.onBlur);
    return textAreaTag;
};
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
export const Label = (options) => {
    const labelTag = Tag("label", options);
    const { for: htmlFor, autoFocus } = options;
    if (htmlFor)
        labelTag.htmlFor = htmlFor;
    if (autoFocus)
        labelTag.autofocus = autoFocus;
    if (options.onFocus)
        labelTag.addEventListener("focus", options.onFocus);
    if (options.onBlur)
        labelTag.addEventListener("blur", options.onBlur);
    return labelTag;
};
const Select = (attr) => {
    const selectTag = Tag("select", attr);
    const { name, value, required, disabled, size, multiple, autoFocus, options, selectedIndex, } = attr;
    if (name)
        selectTag.name = name;
    if (value)
        selectTag.value = value;
    if (required)
        selectTag.required = required;
    if (disabled)
        selectTag.disabled = disabled;
    if (size)
        selectTag.size = size;
    if (multiple)
        selectTag.multiple = multiple;
    if (autoFocus)
        selectTag.autofocus = autoFocus;
    // setingup options
    if (options) {
        if (Array.isArray(options)) {
            options.forEach((child) => selectTag.appendChild(child));
        }
        else {
            selectTag.appendChild(options);
        }
    }
    if (selectedIndex)
        selectTag.selectedIndex = selectedIndex;
    if (attr.onChange)
        selectTag.addEventListener("change", attr.onChange);
    if (attr.onInput)
        selectTag.addEventListener("input", attr.onInput);
    if (attr.onInvalid) {
        selectTag.addEventListener("invalid", attr.onInvalid);
    }
    if (attr.onFocus)
        selectTag.addEventListener("focus", attr.onFocus);
    if (attr.onBlur)
        selectTag.addEventListener("blur", attr.onBlur);
    if (attr.onSelect)
        selectTag.addEventListener("select", attr.onSelect);
    return selectTag;
};
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
export const Option = (options) => {
    const optionTag = Tag("option", options);
    const { value, label, selected, disabled, defaultSelected, autoFocus, } = options;
    if (value)
        optionTag.value = value;
    if (label)
        optionTag.label = label;
    if (selected)
        optionTag.selected = selected;
    if (disabled)
        optionTag.disabled = disabled;
    if (defaultSelected)
        optionTag.defaultSelected = defaultSelected;
    if (autoFocus)
        optionTag.autofocus = autoFocus;
    return optionTag;
};
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
export const OptGroup = (options) => {
    const optGroupTag = Tag("optgroup", options);
    const { label, disabled, autoFocus } = options;
    if (label)
        optGroupTag.label = label;
    if (disabled)
        optGroupTag.disabled = disabled;
    if (autoFocus)
        optGroupTag.autofocus = autoFocus;
    return optGroupTag;
};
