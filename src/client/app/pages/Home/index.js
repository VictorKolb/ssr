import React from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import * as Actions from "redux/actions";
import { Link } from "react-router-dom";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
  }

  componentDidMount() {
    this.props.fetchHome();
  }

  increase() {
    this.props.increase();
  }

  decrease() {
    this.props.decrease();
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Home</title>
          <meta name="description" content="Modern Web App - Home Page" />
        </Helmet>
        <Link to="/about">About</Link> <br />
        Counter: {this.props.count}
        <button onClick={this.props.getHusky}>get husky </button>
        <button color="primary" onClick={this.increase}>
          Increase
        </button>
        <button color="primary" onClick={this.decrease}>
          Decrease
        </button>
        <div>
          <img src={this.props.husky} alt="" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  count: state.count,
  husky: state.husky,
});

export default connect(
  mapStateToProps,
  { ...Actions },
)(Home);
