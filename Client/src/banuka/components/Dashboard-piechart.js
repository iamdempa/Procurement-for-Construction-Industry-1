import React from "react";
import { Pie } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

class ChartsPage extends React.Component {
  state = {
    dataPie: {
      labels: ["Vendors", "Items", "Invoices Made"],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            "#FF5A5E",
            "#616774",
            "#DA92DB",
            "#5AD3D1",
      
          ],
          hoverBackgroundColor: [
            "#FF5A5E",
            "#616774",
            "#DA92DB",
            "#5AD3D1",
    
            
          ]
        }
      ]
    }
  }


  componentDidMount(){
    
  }

  render() {
    return (
      <MDBContainer>
        <h3 className="mt-5">Statistics</h3>
        <Pie data={this.state.dataPie} options={{ responsive: true }} />
      </MDBContainer>
    );
  }
}

export default ChartsPage;