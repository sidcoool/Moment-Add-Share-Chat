const fs = require('fs')

fs.rename(`../uploads/da6a4cc8f480774522bfed5fb9e44949`,
`../uploads/da6a4cc8f480774522bfed5fb9e44949.jpg`, (err) => {
    if (err)
        console.error(err)
})