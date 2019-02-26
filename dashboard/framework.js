import React, { Component } from 'react';
//import logo from './logo.svg';
import './index.css';

//const apiService = require('./apiService');
import { apiService, ApiService } from './apiService';

function framework(WrappedComponent) {
    return class extends Component {
        constructor(props) {
            super(props);

            apiService.Instance = new ApiService((arg) => {
                this.changeStatus(arg);
            });
        }

        state = {
            isLoading: false,
            loadingCount: 0,
            error: null,
            errors: [],
        }

        changeStatus(args) {
            if (args.isLoading) {
                this.state.loadingCount++;
            }
            else {
                this.state.loadingCount--
            }
            this.state.isLoading = this.state.loadingCount > 0;

            if (args.error) {
                this.state.errors.push(args.error);
            }

            this.setState(this.state);
        }

        render() {
            const { isLoading, error, errors } = this.state;
            return (
                <div className="App">
                    {
                        errors.length > 0 ?
                            errors.map(e =>
                                <div className="notify">
                                    <div className="alert alert-danger" role="alert">
                                        Service Error!
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                </div>
                                </div>
                            ) : null
                    }
                    <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                        <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">dashboard</a>
                        <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" />
                        <ul className="navbar-nav px-3">
                            <li className="nav-item text-nowrap">
                                <a className="nav-link" href="#">Sign out</a>
                            </li>
                        </ul>
                    </nav>

                    <div className="container-fluid">
                        <WrappedComponent />
                    </div>

                    {
                        isLoading ? <div id="loader-wrapper" className="loading">
                            <div id="loader" className="loading-content"></div>
                        </div> : null
                    }

                </div>
            );
        }
    }
}

export default framework;
