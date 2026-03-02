const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    if (pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Simple Calculator</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                
                <!-- Bootstrap CSS -->
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
            </head>
            <body class="bg-light">

                <div class="container mt-5">
                    <div class="row justify-content-center">
                        <div class="col-md-6">
                            <div class="card shadow">
                                <div class="card-header text-center bg-primary text-white">
                                    <h3>Simple Calculator</h3>
                                </div>
                                <div class="card-body">
                                    <form action="/calculate" method="get">
                                        
                                        <div class="mb-3">
                                            <label class="form-label">Number 1</label>
                                            <input type="text" name="num1" class="form-control" required>
                                        </div>

                                        <div class="mb-3">
                                            <label class="form-label">Number 2</label>
                                            <input type="text" name="num2" class="form-control" required>
                                        </div>

                                        <div class="mb-3">
                                            <label class="form-label">Operation</label>
                                            <select name="operation" class="form-select">
                                                <option value="add">Addition (+)</option>
                                                <option value="sub">Subtraction (-)</option>
                                                <option value="mul">Multiplication (*)</option>
                                                <option value="div">Division (/)</option>
                                            </select>
                                        </div>

                                        <div class="d-grid">
                                            <button type="submit" class="btn btn-primary">
                                                Calculate
                                            </button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Bootstrap JS -->
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
            </body>
            </html>
        `);
        res.end();
    }

    else if (pathname === '/calculate') {
        const num1 = parseFloat(parsedUrl.query.num1);
        const num2 = parseFloat(parsedUrl.query.num2);
        const operation = parsedUrl.query.operation;

        if (isNaN(num1) || isNaN(num2)) {
            res.writeHead(400, { 'Content-Type': 'text/html' });
            res.write('<h1 class="text-danger text-center mt-5">Invalid Input!</h1>');
            return res.end();
        }

        let result;

        switch (operation) {
            case 'add':
                result = num1 + num2;
                break;
            case 'sub':
                result = num1 - num2;
                break;
            case 'mul':
                result = num1 * num2;
                break;
            case 'div':
                if (num2 === 0) {
                    res.writeHead(400, { 'Content-Type': 'text/html' });
                    res.write('<h1 class="text-danger text-center mt-5">Cannot divide by zero!</h1>');
                    return res.end();
                }
                result = num1 / num2;
                break;
            default:
                res.writeHead(400, { 'Content-Type': 'text/html' });
                res.write('<h1 class="text-danger text-center mt-5">Invalid Operation!</h1>');
                return res.end();
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Result</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
            </head>
            <body class="bg-light">

                <div class="container mt-5">
                    <div class="row justify-content-center">
                        <div class="col-md-6">
                            <div class="card shadow text-center">
                                <div class="card-header bg-success text-white">
                                    <h3>Calculation Result</h3>
                                </div>
                                <div class="card-body">
                                    <h2>Result</h2>
                                    <h1 class="text-primary">${result}</h1>
                                    <a href="/" class="btn btn-secondary mt-3">Go Back</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
            </body>
            </html>
        `);
        res.end();
    }

    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('<h1 class="text-center mt-5 text-danger">404 Not Found</h1>');
        res.end();
    }
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});