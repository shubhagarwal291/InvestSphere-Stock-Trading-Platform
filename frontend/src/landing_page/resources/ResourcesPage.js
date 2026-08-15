import React from "react";

function ResourcesPage() {
  const beginnerInvestingUrl = "https://www.investor.gov/introduction-investing";
  return (
    <div className="container py-5">
      <h1 className="mb-4">Resources</h1>

     <div className="mb-5">
  <h3>Beginner Investing Guide</h3>

  <p>
    Investing means putting your money into assets with the expectation
    of generating returns over time. Before investing, it is important
    to understand your financial goals, investment horizon, risk
    tolerance, and the difference between saving and investing.
  </p>

  <p>
    Beginners should also understand important concepts such as
    diversification, compounding, risk versus return, and the importance
    of making investment decisions based on research rather than emotions.
  </p>

  <a
    href={beginnerInvestingUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="btn btn-primary"
  >
    Read More
  </a>
</div>

 <div className="mb-5">
  <h3>Stock Market Basics</h3>

  <p>
    A stock represents ownership in a company. When you buy shares,
    you become a shareholder and can potentially benefit from the
    company's growth through an increase in share price or dividends.
    However, stock prices can also fall, and returns are never guaranteed.
  </p>

  <p>
    Stock prices are influenced by several factors, including company
    earnings, economic conditions, interest rates, industry trends,
    investor expectations, and market sentiment. Understanding concepts
    such as stock exchanges, market capitalization, indices, trading
    volume, volatility, and different types of orders can help investors
    make more informed decisions.
  </p>

  <a
    href="https://investor.sebi.gov.in/securities-howtoinvest.html"
    target="_blank"
    rel="noopener noreferrer"
    className="btn btn-primary"
  >
    Read More
  </a>
</div>

      <div className="mb-5">
  <h3>How to Analyze Stocks</h3>

  <p>
    Analyzing a stock means studying a company's financial health,
    business model, industry, growth potential, and valuation before
    making an investment decision. Instead of choosing a stock simply
    because its price is rising, investors should understand what the
    company does and how well the business is performing.
  </p>

  <p>
    Fundamental analysis commonly involves looking at revenue, profit,
    earnings per share (EPS), debt, cash flow, profit margins, return on
    equity (ROE), and valuation ratios such as the P/E ratio. Investors
    can also compare a company's financial performance with its
    competitors and consider whether its current valuation is reasonable
    relative to its growth prospects.
  </p>

  <a
    href="https://www.investor.gov/introduction-investing/investing-basics/investment-products/stocks"
    target="_blank"
    rel="noopener noreferrer"
    className="btn btn-primary"
  >
    Read More
  </a>
</div>

      <div className="mb-5">
  <h3>Risk Management Tips</h3>

  <p>
    Every investment carries some level of risk, and even a well-researched
    stock can lose value. Risk management is therefore an important part
    of building and maintaining an investment portfolio. The goal is not
    to eliminate risk completely, but to understand it and manage it
    according to your financial goals and risk tolerance.
  </p>

  <p>
    Diversification is one of the basic ways to reduce concentration risk.
    Instead of putting all your money into a single company or sector,
    spreading investments across different assets and industries can
    reduce the impact of one investment performing poorly. Investors
    should also consider their investment horizon, position size, and
    ability to handle temporary market losses before making decisions.
  </p>

  <a
    href="https://investor.sebi.gov.in/investment_risk_managment.html"
    target="_blank"
    rel="noopener noreferrer"
    className="btn btn-primary"
  >
    Read More
  </a>
</div>
    </div>
  );
}

export default ResourcesPage;