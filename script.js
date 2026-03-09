// Newton-Raphson Iterations
function newtonIterations(f, df, x0, steps) {
  let rows = [];
  let x = x0;

  for (let i = 0; i < steps; i++) {
    let fx = f(x);
    let dfx = df(x);

    if (dfx === 0) {
      alert(`Derivative is zero at iteration ${i + 1}. Stopping.`);
      break;
    }

    let xnext = x - fx / dfx;
    rows.push({ iteration: i + 1, x: x, fx: fx, dfx: dfx, xnext: xnext });
    x = xnext;
  }

  return rows;
}

// Generate HTML Table
function makeTable(rows) {
  if (rows.length === 0) return "<p>No iterations computed.</p>";

  let html = `<table>
    <tr>
      <th>Iteration</th>
      <th>xₙ</th>
      <th>f(xₙ)</th>
      <th>f'(xₙ)</th>
      <th>xₙ₊₁</th>
    </tr>`;

  rows.forEach(r => {
    html += `<tr>
      <td>${r.iteration}</td>
      <td>${r.x.toFixed(6)}</td>
      <td>${r.fx.toFixed(6)}</td>
      <td>${r.dfx.toFixed(6)}</td>
      <td>${r.xnext.toFixed(6)}</td>
    </tr>`;
  });

  html += "</table>";
  return html;
}

// Pre-filled Examples
function loadExamples() {
  const examples = [
    { fstr: '4*x - e^x', x0: 2.5, steps: 3, id: 'ex1Table' },
    { fstr: '2*x^3 - 3*x - 6', x0: 1.5, steps: 3, id: 'ex2Table' }
  ];

  examples.forEach(ex => {
    const fNode = math.parse(ex.fstr);
    const dfNode = math.derivative(fNode, 'x');
    const f = x => fNode.evaluate({ x });
    const df = x => dfNode.evaluate({ x });
    document.getElementById(ex.id).innerHTML = makeTable(newtonIterations(f, df, ex.x0, ex.steps));
  });
}

// Solve user input
function solveUser() {
  const fstr = document.getElementById("ufunc").value;
  const x0 = parseFloat(document.getElementById("ux0").value);
  const steps = parseInt(document.getElementById("uiter").value);

  if (!fstr || isNaN(x0) || isNaN(steps) || steps <= 0) {
    alert("Please fill all fields and enter valid iterations");
    return;
  }

  try {
    const fNode = math.parse(fstr);
    const dfNode = math.derivative(fNode, 'x');
    const f = x => fNode.evaluate({ x });
    const df = x => dfNode.evaluate({ x });

    const rows = newtonIterations(f, df, x0, steps);
    document.getElementById("userTable").innerHTML = makeTable(rows);
  } catch (err) {
    alert("Error in function. Please check your formula.");
    console.error(err);
  }
}

// Load examples on page load
window.onload = loadExamples;
