import * as React from "react";

import Layout from "../../components/Layout";
import PoetryRoll from "../../components/PoetryRoll";

export default class PoetryIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div
          className="full-width-image-container margin-top-0"
          style={{
          backgroundImage: `url('/img/_DSC2862-Essays Print Master.jpg')`,
          }}
        >
          <h1
            className="has-text-weight-bold is-size-1 site-title"
            style={{
              padding: "1rem",
            }}
          >
            Poetry of Helen W. Arehart
          </h1>
        </div>
        <section className="section">
          <div className="container">
            <div className="content">
              <PoetryRoll />
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}
