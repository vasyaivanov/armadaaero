import React from 'react'

const Header = (props) => (
    <header id="header" style={props.timeout ? {display: 'none'} : {}}>
        <div className="logo">
            <span className="fab fa-autoprefixer"></span>
        </div>
        <div className="content">
            <div className="inner">
                <h1>ARMADA</h1>
                <p>Personal Traffic Solution</p>
            </div>
        </div>
        <nav>
            <ul>
                <li><a href="https://www.armadaaero.com">Learn More</a></li>
            </ul>
        </nav>
    </header>
)

Header.propTypes = {
    onOpenArticle: React.PropTypes.func,
    timeout: React.PropTypes.bool
}

export default Header
