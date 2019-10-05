import React, {Component} from "react";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBAnimation,
    MDBCardGroup,
    MDBCard,
    MDBCardImage,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn,
    MDBIcon,
    MDBListGroup,
} from "mdbreact";
import SectionContainer from "../../../components/sectionContainer";
import {confirmAlert} from "react-confirm-alert";
const axios = require('axios');
const env = require('dotenv').config();

let data = [];

 /*const data = [
     {'id':'1','name':'Asia Tools PVT LTD', 'image':'https://mdbootstrap.com/img/Photos/Others/images/16.jpg', 'country': 'China','items':['A','B']},
     {'id':'2','name':'Alibaba Constructions', 'image':'https://mdbootstrap.com/img/Photos/Others/images/16.jpg','country': 'Sri Lanka','items':['D','B']},
     {'id':'3','name':'Asia Metals Industries', 'image':'https://mdbootstrap.com/img/Photos/Others/images/16.jpg', 'country': 'India','items':['E','B']},
     {'id':'4','name':'Lanwa SL', 'image':'https://mdbootstrap.com/img/Photos/Others/images/16.jpg', 'country': 'Japan','items':['A','C']}]
*/

 class ViewAllVendors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message : '',
            dataSet: data,
            filteredSet: data,
            searchValue1: "",
            searchValue2: "",
            searchValue3: ""
        };
    }

    handleSearch1 = event => this.setState({ searchValue1: event.target.value }, () => this.searchForName());
    handleSearch2 = event => this.setState({ searchValue2: event.target.value }, () => this.searchForItems());
    handleSearch3 = event => this.setState({ searchValue3: event.target.value }, () => this.searchForCountry());

    searchForName = () => {
        this.setState(prevState => {
            const filteredSet = prevState.dataSet.filter(item =>
                item.name.toLowerCase().match(this.state.searchValue1.toLowerCase())
            );
            return { filteredSet };
        });
    };

    searchForItems = () => {
        this.setState(prevState => {
            const filteredSet = prevState.dataSet.filter(item =>
                item.items[0].toLowerCase().match(this.state.searchValue2.toLowerCase())
            );
            return { filteredSet };
        });
    };

    searchForCountry = () => {
        this.setState(prevState => {
            const filteredSet = prevState.dataSet.filter(item =>
                item.country.toLowerCase().match(this.state.searchValue3.toLowerCase())
            );
            return { filteredSet };
        });
    };

     deleteVendor(_id){
         const self = this;
         console.log(_id);
         if (_id != null){
             confirmAlert({
                 title: '👉 Confirm',
                 message: 'Are you sure?',
                 buttons: [
                     {
                         label: 'Yes',
                         onClick: () => axios.delete('http://34.93.185.34:3001/api/v1/vendors/'+_id.toString())
                             .then(function (response) {
                                 console.log(response);
                             })
                             .catch(function (error) {
                                 console.log(error)
                                 self.forceUpdate()
                             })
                     },
                     {
                         label: 'No',
                         onClick: () => console.log(`😱 Axios request failed`)
                     }
                 ]
             });
         }
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
            <MDBContainer>
                <SectionContainer header="All Vendors">
                    <MDBRow>
                        <MDBCol md="4">
                            <label>Name</label>
                            <form className="form-inline active-cyan-4 mb-4">
                                <input
                                    className="form-control form-control-sm mr-3 w-75"
                                    type="text"
                                    autoFocus
                                    placeholder="Search"
                                    aria-label="Search"
                                    value={this.state.searchValue1}
                                    onChange={this.handleSearch1}
                                />
                                <MDBIcon icon="search" aria-hidden="true" />
                            </form>
                        </MDBCol>
                        <MDBCol md="4">
                            <label>Items</label>
                            <form className="form-inline active-cyan-4 mb-4">

                                <input
                                    className="form-control form-control-sm mr-3 w-75"
                                    type="text"
                                    placeholder="Search"
                                    aria-label="Search"
                                    value={this.state.searchValue2}
                                    onChange={this.handleSearch2}
                                />
                                <MDBIcon icon="search" aria-hidden="true" />
                            </form>
                        </MDBCol>
                        <MDBCol md="4">
                            <label>Country</label>
                            <form className="form-inline active-cyan-4 mb-4">

                                <input
                                    className="form-control form-control-sm mr-3 w-75"
                                    type="text"
                                    placeholder="Search"
                                    aria-label="Search"
                                    value={this.state.searchValue3}
                                    onChange={this.handleSearch3}
                                />
                                <MDBIcon icon="search" aria-hidden="true" />
                            </form>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                                    {this.state.filteredSet.map(item => (
                                        <MDBCol md="3" className="mx-auto" key={item._id}>
                                            <MDBCardGroup deck className="mt-3">
                                                <MDBListGroup>
                                                    <MDBAnimation type="zoomIn" duration="500ms">
                                                        <MDBCard>
                                                        <MDBCardImage
                                                        src={item.vendorImage}
                                                        alt="MDBCard image cap"
                                                        width="64%"
                                                        top
                                                        hover
                                                        overlay="white-slight"
                                                        />
                                                        <MDBCardBody>
                                                        <MDBCardTitle tag="h5">{item.vendorName}</MDBCardTitle>
                                                        <MDBCardText>
                                                            Country: {item.vendorCountry}
                                                            <br/>
                                                            Description: {item.vendorDescription.substring(0,250)} ... More
                                                        </MDBCardText>
                                                            <MDBBtn href={'details/'+item._id} color="light-blue" size="sm">
                                                                <MDBIcon icon="eye" className="mr-2" /> View
                                                            </MDBBtn>
                                                            <MDBBtn href={'update/'+item._id} color="light-blue" size="sm">
                                                                <MDBIcon icon="cogs" className="mr-2" /> Update
                                                            </MDBBtn>

                                                            <MDBBtn onClick={(_id) => this.deleteVendor(item._id)} outline rounded size="sm" color="light-blue" >
                                                                <MDBIcon icon="trash-alt" className="mr-2" />
                                                                Delete
                                                            </MDBBtn>
                                                        </MDBCardBody>
                                                        </MDBCard>
                                                    </MDBAnimation>
                                                </MDBListGroup>
                                            </MDBCardGroup>
                                        </MDBCol>
                                    ))}
                    </MDBRow>
                </SectionContainer>
            </MDBContainer>
        );
    }
 }

export default ViewAllVendors;
