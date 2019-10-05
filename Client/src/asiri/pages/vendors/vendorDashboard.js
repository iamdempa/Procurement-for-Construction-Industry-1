import React, {Component} from "react";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBAnimation
} from "mdbreact";
import SectionContainer from "../../../components/sectionContainer";
import {Bar} from "react-chartjs-2";
const axios = require('axios');
const env = require('dotenv').config();

class VendorDashboard extends Component {
    dataBar = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        datasets: [
            {
                label: "#1",
                data: [12, 39, 3, 50, 2, 32, 84],
                backgroundColor: "rgba(245, 74, 85, 0.5)",
                borderWidth: 1
            },
            {
                label: "#2",
                data: [56, 24, 5, 16, 45, 24, 8],
                backgroundColor: "rgba(90, 173, 246, 0.5)",
                borderWidth: 1
            },
            {
                label: "#3",
                data: [12, 25, 54, 3, 15, 44, 3],
                backgroundColor: "rgba(245, 192, 50, 0.5)",
                borderWidth: 1
            }
        ]
    };
    barChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            xAxes: [
                {
                    barPercentage: 1,
                    gridLines: {
                        display: true,
                        color: "rgba(0, 0, 0, 0.1)"
                    }
                }
            ],
            yAxes: [
                {
                    gridLines: {
                        display: true,
                        color: "rgba(0, 0, 0, 0.1)"
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }
            ]
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            dataSet: this.data,
            filteredSet: this.data
        };
    }

    componentDidMount() {
        const self = this;
        // Make a request to fetch data
        axios.get('http://34.93.185.34:3001/api/v1/vendors')
            .then(function (response) {
                console.log(response);
                //self.data = response.data;
                self.setState({dataSet: response.data, filteredSet: response.data})
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }

    render() {
        return (
            <>
                <MDBContainer className="mt-5">
                    <MDBAnimation type="zoomIn" duration="500ms">
                        <MDBContainer>
                            <MDBRow>
                                <MDBCol md="12" className="mx-auto">
                                    <SectionContainer header="Dashboard">
                                        <Bar data={this.dataBar} options={this.barChartOptions}/>
                                    </SectionContainer>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol md="12" className="mx-auto">
                                    <SectionContainer header="Dashboard">

                                    </SectionContainer>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                    </MDBAnimation>
                </MDBContainer>
            </>
        );
    };
}

export default VendorDashboard;
