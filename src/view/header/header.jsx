import React from 'react';
import logo from '../../assets/spacex-logo.png'

const Header = (props) => {
    return (
        <React.Fragment>
            <nav className="level">
                <div className="level-left">
                    <div className="level-item">
                        <p className="subtitle is-5">
                            <img src={logo} height="24" width="180" />
                        </p>
                    </div>
                    <div className="level-item">
                        <span className="subtitle is-5">LAUNCHES</span>
                    </div>
                </div>
                <div className="level-right">
                    <button class="button is-primary is-medium btn-refresh">
                        <span>Reload data</span>
                        <span class="icon is-small img-wrapper">
                            <i class="refresh" />
                        </span>
                    </button>
                </div>
            </nav>
        </React.Fragment>
    );
};
export default Header