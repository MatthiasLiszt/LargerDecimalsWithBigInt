# LargerDecimalsWithBigInt
larger decimal floating point numbers with bigint

## Background 

JavaScript had only one number type -- 64 bit floating point numbers -- which causedd rounding errors and could not represent decimal fractions Bi like 0.1 exactly. Recently BigInt has been added which just supports arbitrary long integer values. 

## Support

The class dFloat (written as a function) supports decimals with base ten instead of base two and is set to an exactness of 32 digits. 
Currently multiplication, addition, modular division, shortening to 32 digits, multiplicative inverse etc. are supported.

It has not sufficiently been tested. 

## Usage

Load the js-file.

### Creating a dFloat

a=new dFloat("3.1415");

### arithmetics

b=a.add(a).mult(a); // b=(a+a)*a;
console.log(b.toString());
