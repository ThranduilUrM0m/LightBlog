import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import { Home } from '../../components';

const App = (props) => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  )
}

export default withRouter(App);

// const App = (props) => {
//     return (
//         <table>
//             <tr>
//                 <td><img alt="#" src="#"/></td>
//                 <td>TITLE</td>
//                 <td><h5>DESCRIPTION</h5></td>
//                 <td><a href="#">LINK</a></td>
//                 <td>DATE</td>
//             </tr>
//         </table>
//     )
// }