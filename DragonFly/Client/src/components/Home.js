import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropertiesAll from './PropertiesAll';
import './external.css';

function Home() {
    return (
        <div>
            <div id="root">
                <div className="container-fluid text-center" style={{marginTop: '30px'}}>
                    <div className="row">
                        <div className="col-md-2 side-section">
                            <table>
                                <thead>
                                    <tr className="table-info">
                                        <th>Continents</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Africa</td>
                                    </tr>
                                    <tr>
                                        <td>Asia</td>
                                    </tr>
                                    <tr>
                                        <td>Europe</td>
                                    </tr>
                                    <tr>
                                        <td>North America</td>
                                    </tr>
                                    <tr>
                                        <td>Oceania</td>
                                    </tr>
                                    <tr>
                                        <td>South America</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table>
                                <thead>
                                    <tr className="table-info">
                                        <th>Types of stays</th>
                                    </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td><img src="https://i.imgur.com/rQp8GS0.png" title="source: imgur.com" alt="" width={24} height={24} />Hotels</td>
                                </tr>
                                <tr>
                                    <td><img src="https://i.imgur.com/NeEvslK.png" title="source: imgur.com" alt="" width={24} height={24} />Bed and breakfasts</td>
                                </tr>
                                <tr>
                                    <td><img src="https://i.imgur.com/Pn3pQ3H.png" title="source: imgur.com" alt="" width={24} height={24} />Guest houses</td>
                                </tr>
                                <tr>
                                    <td><img src="https://i.imgur.com/wxhTMHJ.png" title="source: imgur.com" alt="" width={24} height={24} />Chalets</td>
                                </tr>
                                <tr>
                                    <td><img src="https://i.imgur.com/fq2sAZX.png" title="source: imgur.com" alt="" width={24} height={24} />Youth Hostels</td>
                                </tr>
                                <tr>
                                    <td><img src="https://i.imgur.com/Ty5D1Vp.png" title="source: imgur.com" alt="" width={24} height={24} />Self-Catered</td>
                                </tr>
                                <tr>
                                    <td><img src="https://i.imgur.com/7CjxnZo.png" title="source: imgur.com" alt="" width={24} height={24} />Cottages</td>
                                </tr>
                                <tr>
                                    <td><img src="https://i.imgur.com/l6oH6U9.png" title="source: imgur.com" alt="" width={24} height={24} />Apartments</td>
                                </tr>
                                <tr>
                                    <td><img src="https://i.imgur.com/TMlPILE.png" title="source: imgur.com" alt="" width={24} height={24} />Boats</td>
                                </tr>
                                <tr>
                                    <td><img src="https://i.imgur.com/2qMBtk0.png" title="source: imgur.com" alt="" width={24} height={24} />Log Cabins</td>
                                </tr>
                                <tr>
                                    <td><img src="https://i.imgur.com/xjEhqZu.png" title="source: imgur.com" alt="" width={24} height={24} />Caravans</td>
                                </tr>
                                <tr>
                                    <td><img src="https://i.imgur.com/034yYNz.png" title="source: imgur.com" alt="" width={24} height={24} />Campers</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-10">
                            <div className="container-fluid" style={{marginTop: '30px'}}>
                                <div className="main">
                                    <PropertiesAll />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home;