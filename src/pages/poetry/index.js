import * as React from "react";

import Layout from "../../components/Layout";
import PoetryRoll from "../../components/PoetryRoll";
import FullWidthImage from "../../components/FullWidthImage";

export default class PoetryIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <FullWidthImage 
          img="/img/_DSC2862-Essays Print Master.jpg"
          height={280}
          title="Poetry of Helen W. Arehart"
          subheading="Favorites From My Mom's Pencil.  They Wrote Themselves, She Claimed."
        />
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
