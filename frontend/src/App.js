import './App.css';
import { useEffect, useState } from 'react';
import { List, Button } from 'antd';
import axios from "axios";

const url = "/api/v1/customer"

function App() {
  console.log(process.env.NODE_ENV);
  
  const [ customers, setCustomers ] = useState([]);
  const [ orders, setOrders ] = useState([]);

  const fetchOrder = id => {
    console.log("fetching orders for customer " + id)
    axios.get(url + "/" + id + "/orders")
          .then(res => {
              setOrders(res.data.items)
          }).catch(console.log)
  }

  useEffect(() => {
    console.log(url)
    axios.get(url)
      .then(res => {
        console.log("Success")
        console.log(res.data)
        setCustomers(res.data)
      }).catch(err => {
        console.log("Error")
        console.log(err);
      })
  }, []);

  console.log(customers);

  return <> 
    <div>
      {customers.length < 1 ? "no data" : <div> 
      <List
        size="large"
        header={<h1>Customers</h1>}
        footer={"Data coming from customer microservice"}
        bordered
        dataSource={customers}
        renderItem={item => <List.Item>
          {`Name: ${item.name} | Gender: ${item.gender} | Address: ${item.address}`} - <Button size="small" onClick={() => fetchOrder(item.id)}>View Orders</Button>
        </List.Item>}
        />
      </div>
      }
      {orders && orders.length < 1 ? "No customer selected" : <List
        size="large"
        header={<h1>Orders</h1>}
        footer={"Data coming from order microservice via customer"}
        bordered
        dataSource={orders}
        renderItem={item => <List.Item>
          {`Item ${item}`}
        </List.Item>}
        />}
    </div>
  </>
}

export default App;
