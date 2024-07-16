# Rut-Chile
## Comprehensive RUT Validation and Utilities for JavaScript and TypeScript

**Rut-Chile** is a comprehensive package for working with Chilean RUTs (Rol Único Tributario) in JavaScript and TypeScript. It provides a robust validation mechanism that goes beyond the standard verification digit check, ensuring the RUT adheres to all structural and format requirements. Additionally, it offers versatile formatting and de-formatting functionalities with control over case sensitivity and hyphen.

#### **Key Features:**

* **Rigorous Validation:**
    * Validates the verification digit using the Chilean RUT algorithm.
    * Checks for invalid characters.
    * Ensures proper spacing and dash placement.
    * Verifies the correct number of characters.
    * `validateWithResponse` function provides a detailed response object including validation status, message, and validity flag.

* **Flexible Formatting:**
    * Formats RUTs to various standard formats with configurable separators (dot, comma, with uppercase or lowercase).
    * Handles both hyphenated and non-hyphenated RUT inputs (the hyphen is optional).
    * Case Sensitivity Control: Formats the RUT output (including the verification digit 'K') in uppercase or lowercase as desired.

* **De-formatting Options:**
    * Removes formatting characters and dashes (optional).
    * Extracts RUT from formatted strings.

* **TypeScript Support:**
    * Seamless integration with TypeScript projects.

## **Installation:**

```
npm install rut-chile
```

### **Usage:**
#### `validate` and `validateWithResponse` 
> Validates a Chilean RUT (Rol Único Tributario). Checks if it has wrong characters, spaces or bad length. Finally, it verifies if the verification digit is valid.

```javascript
import RUT from 'rut-chile';

const rut = '10766555-2';

// Rut-Chile also accepts RUTs in these formats:
// 10.766.555-2 (Dotted format)
// 10,766,555-2 (Comma format)
// 107665552 (Unformatted, without separators and without hyphen)
// Accepts lowercase or uppercase, in case of 'k'.

console.log(RUT.validate(rut)) // Output: true
console.log(RUT.validateWithResponse(rut)) // RUTResult Object Output: { status: success, message: 'Valid RUT', payload: true}

const badRut = '10766555-k'; // Wrong verification digit

console.log(RUT.validate(badRut)) // Output: false
console.log(RUT.validateWithResponse(badRut)) // RUTResult Object Output: { status: error, message: 'Invalid check digit', payload: false}
