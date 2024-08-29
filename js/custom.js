document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault() // Prevent the form from refreshing the page

    // Gets the user inputs
    const annualSalary = parseFloat(document.getElementById('gross-income').value)
    const state = document.getElementById('salary-select').value

    // Defines tax rates based on states
    let taxRate, marginalTaxRate
    
    if (state === 'cali') {
        taxRate = 0.2
        marginalTaxRate = 0.35
    } else if (state === 'nm') {
        taxRate = 0.18
        marginalTaxRate = 0.32
    } else if (state === 'or') {
        taxRate = 0.22
        marginalTaxRate = 0.36
    }

    // Calculations
    const tax = annualSalary * taxRate
    const netPay = annualSalary - tax
    const monthlyPay = netPay / 12
    const additionalTax = 100 * marginalTaxRate
    const netIncrease = 100 - additionalTax

    // Calculate bonus 
    const bonus1k = 1000;
    const bonus5k = 5000;
    const bonusIncome1k = bonus1k * (1 - marginalTaxRate)
    const bonusIncome5k = bonus5k * (1 - marginalTaxRate)

    // Create dynamic content
    const stateFullName = state === 'cali' ? 'California, USA' : state === 'nm' ? 'New Mexico, USA' : 'Oregon, USA'

    const summaryText = `
        If you make <strong>$${annualSalary.toLocaleString()}</strong> a year living in the region of <strong>${stateFullName}</strong>, you will be taxed <strong>$${tax.toLocaleString()}</strong>. 
        That means that your net pay will be <strong>$${netPay.toLocaleString()}</strong> per year, or <strong>$${monthlyPay.toFixed(2)}</strong> per month. 
        Your average tax rate is <strong>${(taxRate * 100).toFixed(1)}%</strong> and your marginal tax rate is <strong>${(marginalTaxRate * 100).toFixed(1)}%</strong>. 
        This marginal tax rate means that your immediate additional income will be taxed at this rate. 
        For instance, an increase of <strong>$100</strong> in your salary will be taxed <strong>$${additionalTax.toFixed(2)}</strong>, 
        hence, your net pay will only increase by <strong>$${netIncrease.toFixed(2)}</strong>.
    `

    const bonusText = `
        A <strong>$${bonus1k}</strong> bonus will generate an extra <strong>$${bonusIncome1k.toFixed(2)}</strong> of net incomes.<br>
        A <strong>$${bonus5k}</strong> bonus will generate an extra <strong>$${bonusIncome5k.toFixed(2)}</strong> of net incomes.
    `

    // Insert the dynamic content into the result div
    document.getElementById('result').innerHTML = `
        <h2>Summary</h2>
        <p>${summaryText}</p>
        <h2>Bonus Example</h2>
        <p>${bonusText}</p>
    `

    // Show the result section
    document.getElementById('result').style.display = 'block'
})