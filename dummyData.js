const mongoose = require('mongoose');
const Customer = require('./models/customer');
const Transfer = require('./models/transfer');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });
  
  const dummyCustomers = [
    {
        name: 'John Doe',
        email: 'john@example.com',
        balance: 1000,
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        balance: 500,
      },
      {
        name: 'Michael Johnson',
        email: 'michael@example.com',
        balance: 2000,
      },
      {
        name: 'Emily Davis',
        email: 'emily@example.com',
        balance: 1500,
      },
      {
        name: 'David Brown',
        email: 'david@example.com',
        balance: 300,
      },
      {
        name: 'Olivia Wilson',
        email: 'olivia@example.com',
        balance: 100,
      },
      {
        name: 'Daniel Taylor',
        email: 'daniel@example.com',
        balance: 750,
      },
      {
        name: 'Sophia Martinez',
        email: 'sophia@example.com',
        balance: 1200,
      },
      {
        name: 'Alexander Anderson',
        email: 'alexander@example.com',
        balance: 800,
      },
      {
        name: 'Abigail Thomas',
        email: 'abigail@example.com',
        balance: 400,
      },
    // Add more customer objects as needed
  ];
  
  async function seedDatabase() {
    try {
      await Customer.deleteMany();
      await Transfer.deleteMany();
  
      const createdCustomers = await Customer.create(dummyCustomers);
  
      console.log('Dummy data inserted successfully:', createdCustomers);
    } catch (error) {
      console.error('Error inserting dummy data:', error);
    } finally {
      mongoose.disconnect();
    }
  }
  
  seedDatabase();

  