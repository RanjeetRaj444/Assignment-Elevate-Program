# Pattern Printing Assignment

This project contains functions to generate and print various patterns based on a given input value `n`. The patterns include a sandglass star pattern, an X pattern, an alphabet pyramid, and Pascal's Triangle. Each pattern is implemented in its own JavaScript file.

## Files

- **sandglassPattern.js**: Generates and prints a sandglass star pattern.
- **xPattern.js**: Generates and prints an X pattern.
- **alphabetPyramid.js**: Generates and prints an alphabet pyramid.
- **pascalsTriangle.js**: Generates and prints Pascal's Triangle.

## Instructions

To run each pattern generation function, follow these steps:

1. Ensure you have Node.js installed on your machine.
2. Open your terminal and navigate to the project directory.
3. Run the desired pattern file using Node.js.

### Examples

#### Sandglass Star Pattern

To generate a sandglass star pattern with `n = 5`, run:

```bash
node sandglassPattern.js 5
```

**Expected Output:**

```
*********
 *******

  *****
   ***

    *
   ***

  *****
 *******

*********
```

#### X Pattern

To generate an X pattern with `n = 5`, run:

```bash
node xPattern.js 5
```

**Expected Output:**

```
*   *
 * *
  *

 * *
*   *
```

#### Alphabet Pyramid

To generate an alphabet pyramid with `n = 5`, run:

```bash
node alphabetPyramid.js 5
```

**Expected Output:**

```
    A
   ABA
  ABCBA
 ABCDCBA
ABCDEDCBA
```

#### Pascal's Triangle

To generate Pascal's Triangle with `n = 5`, run:

```bash
node pascalsTriangle.js 5
```

**Expected Output:**

```
    1
   1 1
  1 2 1
 1 3 3 1
1 4 6 4 1
```

## Conclusion

This project serves as a demonstration of pattern generation using loops and basic JavaScript functions. Feel free to modify the input values to see different patterns!
