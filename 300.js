"1." 
    a = 10
    b = 20
    c = 5
    a = a + 3
    b = b + 4 - a
    c = a + b + c
    a = a + c
    b = 4
    c = c + 3 - b + 2
document.getElementById("1").innerHTML = `
  a = ${a}\n\n  b = ${b}\n\n  c = ${c}`; 


"2."

  a = 5
  b = 18
  c = 15
  d = 25
  a = a + 10
  b = b + 5 - c
  c = c + 4 + b
  d = d + b + a
  a = a + 1
  b = b + c
  c = b + c
  d = b + b
  document.getElementById("2").innerHTML = `
  a = ${a}\n\n  b = ${b}\n\n  c = ${c}\n\n  d = ${d}`; 


"3."

  a = 9
  b = 6
  a = a + 4
  b = b + 2
  a = a + 10
  b = b - 25
  a = a - 20
  b = b + 5
  a = a + 4
  b = b + 2
  a = a + 10
  b = b - 10
  document.getElementById("3").innerHTML = `
  a = ${a}\n\n  b = ${b}`; 


"4."

  a = 18
  b = 18
  c = 18
  d = 18
  a = a + b
  b = a - b
  c = a + b
  d = a - b
  a = a - b
  b = a + b
  c = a - b
  d = a + b
  document.getElementById("4").innerHTML = `
  a = ${a}\n\n  b = ${b}\n\n  c = ${c}\n\n  d = ${d}`; 


"5."

  a = 10
  b = 5
  a = a - 5
  b = b + 6
  a = a + 18
  b = b - 23
  a = a - 21
  b = b - 5
  a = a - 4
  b = b - 2
  a = a + 10
  b = b + 10
  document.getElementById("5").innerHTML = `
  a = ${a}\n\n  b = ${b}`; 


"6."

  a = 8
  b = 7
  c = 5
  d = 8
  a = a + b - c + d
  b = a + b - c + d
  c = a + b - c + d
  d = a + b - c + d
  a = a + b - c + d
  b = a + b - c + d
  c = a + b - c + d
  d = a + b - c + d
  document.getElementById("6").innerHTML = `
  a = ${a}\n\n  b = ${b}\n\n  c = ${c}\n\n  d = ${d}`; 