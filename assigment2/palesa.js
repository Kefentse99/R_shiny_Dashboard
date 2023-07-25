// Create 'Loan_agents' collection
db.Loan_agents.insertMany([
  {
    LoanAgentId: 'LA001',
    FirstName: 'Kago',
    LastName: 'Tanki',
    Email: 'kago@tanki.com',
    Phone: '781234322'
  },
  {
    LoanAgentId: 'LA002',
    FirstName: 'Moro',
    LastName: 'Boro',
    Email: 'moroboro@gmail.com',
    Phone: '768929272'
  },
  {
    LoanAgentId: 'LA003',
    FirstName: 'David',
    LastName: 'Larry',
    Email: 'david.larry@yahoo.com',
    Phone: '7657891230'
  },
  {
    LoanAgentId: 'LA004',
    FirstName: 'David',
    LastName: 'Johnson',
    Email: 'david.johnson@example.com',
    Phone: '4567891230'
  }
 
]);

// Create 'clients' collection
db.clients.insertMany([
  {
    client_id: 745637465,
    client_name: 'Kago Mmopi',
    phone: '78345678',
    occupation: 'Engineer',
    postal_address: 'plot 456 Gaborone',
    email: 'kagom@yahoo.com'
  },
  {
    client_id: 379373955,
    client_name: 'Baki Balete',
    phone: '75654321',
    occupation: 'Teacher',
    postal_address: 'plot 123 Gaborone',
    email: 'baki@yahoo.com'
  },
  {
    client_id: 157282922,
    client_name: 'Jim Gaffigan',
    phone: '79765432',
    occupation: 'Police Officer',
    postal_address: 'plot 908 Gaborone',
    email: 'jim@yahoo.com'
  },

  {
    client_id: 379373934,
    client_name: 'Motheo Kabelo',
    phone: '71654321',
    occupation: 'Teacher',
    postal_address: 'plot 420 Gaborone',
    email: 'motheo@gmail.com'
  },
  {
    client_id: 793739343,
    client_name: 'Palesa Segopa',
    phone: '71654321',
    occupation: 'Teacher',
    postal_address: 'plot 324 Gaborone',
    email: 'segopa@gmail.com'
  },
  {
    client_id: 937393437,
    client_name: 'Kgisi Mmusi',
    phone: '76654321',
    occupation: 'Teacher',
    postal_address: '456 Masuga',
    email: 'mmusi@yahoo.com'
  }
  
]);

// Insert loans with nested payments using insertMany()
db.loans.insertMany([
  {
    loan_amount: 60000,
    monthly_payment: 1500,
    balance: 2500,
    client_id: 745637465,
    payments: [
      {
        payment_amount: 250,
        payment_date: ISODate('2023-01-22')
      },
      {
        payment_amount: 500,
        payment_date: ISODate('2023-02-22')
      }
    ]
  },
  {
    loan_amount: 10000,
    monthly_payment: 1000,
    balance: 5000,
    client_id: 379373955,
    payments: [
      {
        payment_amount: 250,
        payment_date: ISODate('2023-03-22')
      },
      {
        payment_amount: 500,
        payment_date: ISODate('2023-04-22')
      }
    ]
  },
  {
    loan_amount: 15000,
    monthly_payment: 1000,
    balance: 7500,
    client_id: 157282922,
    payments: []
  },
  {
    loan_amount: 20000,
    monthly_payment: 20000,
    balance: 20000,
    client_id: 793739343,
    payments: []
  },
  {
    loan_amount: 30000,
    monthly_payment: 1500,
    balance: 10000,
    client_id: 937393437,
    payments: [
      {
        payment_amount: 500,
        payment_date: ISODate('2023-02-22')
      }
    ]
  }
]);
