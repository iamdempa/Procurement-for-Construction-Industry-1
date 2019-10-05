import React from "react";
import { Route, Switch } from "react-router-dom";


//imports from Common home page
import V1HomePage from "./pages/temp/v1_home_page";

//imports from Asiri
import AddVendor from "./asiri/pages/vendors/addVendor";
import Reporting from "./asiri/pages/vendors/reporting";
import UpdateVendor from "./asiri/pages/vendors/UpdateVendor";
import ViewAllVendors from "./asiri/pages/vendors/viewAllVendors";
import ViewVendorDetails from "./asiri/pages/vendors/viewVendorDetails";
import VendorDashboard from "./asiri/pages/vendors/vendorDashboard";

import AddItem from "./asiri/pages/inventory/addItems";
import UpdateItem from "./asiri/pages/inventory/UpdateItem";
import ViewAllItems from "./asiri/pages/inventory/viewAllItems";
import ViewItemDetails from "./asiri/pages/inventory/viewItemDetails";
import ItemsDashboard from "./asiri/pages/inventory/itemsDashboard";

//import from Banuka
import Banuka from './banuka/components/Banuka';
import BanukaDashboard from './banuka/components/Dashboard';
import BanukaCreate from './banuka/components/CreateInvoice'
import BanukaViewInvoices from './banuka/components/ViewInvoices'
import ViewOneInvoice from './banuka/components/ViewOneInvoice';



//imports from vihanga
import addorder from "./vihanga/pages/addOrder";
import editOrder from "./vihanga/pages/editOrder";
import editStock from "./vihanga/pages/editStock";
import viewOrders from "./vihanga/pages/viewOrders";
import ViewAllOrders from "./vihanga/pages/viewAllOrders";
import addstock from "./vihanga/pages/addStock";
import viewStocks from "./vihanga/pages/viewStocks";

// FREE
import AnimationPage from "./pages/AnimationPage";
import AlertPage from "./pages/AlertPage";
import HomePage from "./pages/HomePage";
import ButtonPage from "./pages/ButtonPage";
import CSSNavPage from "./pages/CSSNavPage";
import TablePage from "./pages/TablePage";
import TableResponsivePage from "./pages/TableResponsivePage";
import TableScrollPage from "./pages/TableScrollPage";
import TableStylesPage from "./pages/TableStylesPage";
import BadgePage from "./pages/BadgePage";
import BreadcrumbPage from "./pages/BreadcrumbPage";
import FaPage from "./pages/FaPage";
import DatatablePage from "./pages/DatatablePage";
import DatatableApiPage from "./pages/DatatableApiPage";
import ModalPage from "./pages/ModalPage";
import ModalFormPage from "./pages/ModalFormPage";
import ModalExamplesPage from "./pages/ModalExamplesPage";
import ProgressPage from "./pages/ProgressPage";
import InputPage from "./pages/InputPage";
import MediaPage from "./pages/MediaPage";
import JumbotronPage from "./pages/JumbotronPage";
import CardsPage from "./pages/CardsPage";
import PaginationPage from "./pages/PaginationPage";
import PopoverPage from "./pages/PopoverPage";
import ListGroupPage from "./pages/ListGroupPage";
import CarouselPage from "./pages/CarouselPage";
import PanelPage from "./pages/PanelPage";
import CollapsePage from "./pages/CollapsePage";
import TooltipsPage from "./pages/TooltipsPage";
import FooterPage from "./pages/FooterPage";
import MasksPage from "./pages/MasksPage";
import DropdownPage from "./pages/DropdownPage";
import VideoCarouselPage from "./pages/VideoCarouselPage";
import HoverPage from "./pages/HoverPage";
import FormsPage from "./pages/FormsPage";
import ChartsPage from "./pages/ChartsPage";
import SearchPage from "./pages/SearchPage";
import ValidationPage from "./pages/ValidationPage";
import NavbarPage from "./pages/NavbarPage";
import IframePage from "./pages/IframePage";
import EdgeHeaderPage from "./pages/EdgeHeaderPage"
import SpinnerPage from './pages/SpinnerPage';
import MasonryPage from './pages/MasonryPage';
import ScrollBarPage from './pages/ScrollBarPage';
import NavsPage from './pages/NavsPage';
import TabsPage from './pages/TabsPage';
import PillsPage from './pages/PillsPage';
import NotificationPage from './pages/NotificationPage';
import InputGroupPage from './pages/InputGroupPage'
import TreeviewPage from './pages/TreeviewPage'

class Routes extends React.Component {
  render() {
    return (
      <Switch>
          {/* All V1 release pages */}
          <Route exact path="/v1" component={V1HomePage} />

          {/* Routs for Asiri */}
          <Route exact path="/vendor/add" component={AddVendor} />
          <Route exact path="/vendor/reporting" component={Reporting} />
          <Route exact path="/vendor/update/:id" component={UpdateVendor} />
          <Route exact path="/vendor/all" component={ViewAllVendors} />
          <Route exact path="/vendor/details/:id" component={ViewVendorDetails} />
          <Route exact path="/vendor/dashboard" component={VendorDashboard} />

          <Route exact path="/items/add" component={AddItem} />
          <Route exact path="/items/update/:id" component={UpdateItem} />
          <Route exact path="/items/all" component={ViewAllItems} />
          <Route exact path="/items/details/:id" component={ViewItemDetails} />
          <Route exact path="/items/dashboard" component={ItemsDashboard} />
          {/* end of Routs for asiri */}


           {/* Routes of Banuka */}
          <Route exact path="/banuka/dashboard" component={BanukaDashboard}></Route>
          <Route exact path="/banuka/create" component={BanukaCreate}></Route>
          <Route exact path="/banuka/view" component={BanukaViewInvoices}></Route>
          <Route exact path="/banuka/view/:id" component={ViewOneInvoice}></Route>
          {/* End of Routes of Banuka */}



          {/* Routs for vihanga */}
          <Route exact path="/orders/addorders" component={addorder} />
          <Route exact path="/stocks/addstocks" component={addstock} />
          <Route exact path='/index/stocks' component={ viewStocks } />
          <Route exact path='/edit/:id' component={ editOrder } />
          <Route exact path='/edits/:id' component={ editStock } />
          <Route exact path='/index' component={ viewOrders } />
          <Route exact path="/orders/all" component={ViewAllOrders} />
          {/* end of Routs for vihanga */}



        {/* FREE */}
        <Route exact path="/" component={ViewAllVendors} />
        
        <Route
          render={function () {
            return <h1>Not Found</h1>;
          }}
        />
      </Switch>
    );
  }
}

export default Routes;

