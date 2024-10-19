// Sample JSON input as a string
const input = `{
    "keys": {
    "n": 10,
    "k": 7
  },
  "1": {
    "base": "6",
    "value": "13444211440455345511"
  },
  "2": {
    "base": "15",
    "value": "aed7015a346d63"
  },
  "3": {
    "base": "15",
    "value": "6aeeb69631c227c"
  },
  "4": {
    "base": "16",
    "value": "e1b5e05623d881f"
  },
  "5": {
    "base": "8",
    "value": "316034514573652620673"
  },
  "6": {
    "base": "3",
    "value": "2122212201122002221120200210011020220200"
  },
  "7": {
    "base": "3",
    "value": "20120221122211000100210021102001201112121"
  },
  "8": {
    "base": "6",
    "value": "20220554335330240002224253"
  },
  "9": {
    "base": "12",
    "value": "45153788322a1255483"
  },
  "10": {
    "base": "7",
    "value": "1101613130313526312514143"
  }
}`;

/**
 * Converts a value from a given base to decimal (base 10).
 * @param {string} value - The string representation of the number in the given base.
 * @param {number} base - The numerical base of the value (e.g., 2, 4, 10).
 * @return {number} - The converted decimal value.
 */
function convertToDecimal(value, base) {
    return parseInt(value, base);
}

/**
 * Uses Lagrange interpolation to calculate the constant term 'c' (f(0)).
 * @param {Array} points - An array of [x, y] pairs representing the points on the polynomial.
 * @return {number} - The calculated constant term (c).
 */
function lagrangeInterpolation(points) {
    let c = 0.0; // Store the constant term f(0)

    const n = points.length;
    for (let i = 0; i < n; ++i) {
        let term = points[i][1]; // Start with y_i

        // Compute the product for the Lagrange basis polynomial
        for (let j = 0; j < n; ++j) {
            if (i !== j) {
                term *= (0 - points[j][0]); // (x - x_j) where x = 0
                term /= (points[i][0] - points[j][0]); // (x_i - x_j)
            }
        }
        c += term; // Accumulate the result
    }

    return c;
}

/**
 * Main function to parse the input, convert values, and calculate the constant term.
 */
function main() {
    // Parse the JSON input
    const data = JSON.parse(input);
    const points = [];

    // Extract the points from the JSON input and convert values to decimal
    for (const key in data) {
        if (key !== "keys") {
            const base = parseInt(data[key].base);
            const value = data[key].value;
            const decimalValue = convertToDecimal(value, base); // Convert to decimal

            // Use the key as the x-coordinate
            const x = parseInt(key);
            points.push([x, decimalValue]);
        }
    }

    // Calculate the constant term (c)
    const constantTerm = lagrangeInterpolation(points);
    console.log(`The constant term (c) is: ${constantTerm.toFixed(2)}`);
}

// Run the main function
main();