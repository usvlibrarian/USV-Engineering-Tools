import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const PieChartSection = ({ data, height = 300 }) => {
  const COLORS = {
    primary: "#28A055",
    gold: "#F9B44F",
    indigo: "#161C74",
    grey: "#808080",
  };

  const sortedData = [
    ...data.filter((item) => item.name !== "None"),
    ...data.filter((item) => item.name === "None"),
  ];

  const getColor = (entry, index) => {
    if (entry.name === "None") return COLORS.indigo;
    return [COLORS.primary, COLORS.gold, COLORS.grey][index % 3];
  };

  return (
    <div
      style={{
        margin: "2rem 0",
        padding: "20px",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      <div style={{ height: `${height}px` }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={sortedData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name} (${(percent * 100).toFixed(0)}%)`
              }
              outerRadius={80}
              dataKey="value"
            >
              {sortedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry, index)} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value} teams`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const BarChartSection = ({ data, height = 300 }) => {
  return (
    <div
      style={{
        margin: "2rem 0",
        padding: "20px",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      <div style={{ height: `${height}px` }}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
            <YAxis />
            <Tooltip formatter={(value) => `${value} teams`} />
            <Legend />
            <Bar dataKey="value" fill="#28A055" name="Teams Using" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const BlogPost = () => {
  const llmUsage = [
    { name: "ChatGPT", value: 19 },
    { name: "Claude", value: 4 },
    { name: "None", value: 4 },
  ];

  const writingCode = [
    { name: "Co-Pilot", value: 24 },
    { name: "Cursor", value: 11 },
    { name: "Replit", value: 1 },
    { name: "Zed", value: 1 },
    { name: "ChatGPT", value: 1 },
    { name: "None", value: 4 },
  ];

  const codeSearch = [
    { name: "Cursor", value: 9 },
    { name: "Sourcegraph", value: 1 },
    { name: "None", value: 17 },
  ];

  const frontendPrototyping = [
    { name: "v0 by Vercel", value: 3 },
    { name: "Claude", value: 2 },
    { name: "None", value: 23 },
  ];

  const testingCode = [
    { name: "QA Wolf", value: 1 },
    { name: "Testrigor", value: 1 },
    { name: "None", value: 26 },
  ];

  const documentation = [
    { name: "Mintlify", value: 1 },
    { name: "ChatGPT", value: 1 },
    { name: "None", value: 26 },
  ];

  return (
    <article
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        color: "#333333",
        lineHeight: 1.6,
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: 600,
          marginBottom: "2rem",
          lineHeight: 1.2,
        }}
      >
        Emerging AI Tool Usage Across Engineering Teams
      </h1>

      <p>
        Last month, we surveyed engineering leaders across USV's portfolio
        companies about their AI tool adoption. With 30+ teams responding, we
        got a clear snapshot of what's actually being used in production. This
        is the first in a series of surveys we'll be running across the
        business-building stack to understand how teams are implementing AI in
        practice.
      </p>

      <p>
        The results align closely with what{" "}
        <a
          href="https://paragraph.xyz/@in-transit.com/data-springs"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#28A055",
            textDecoration: "underline",
          }}
        >
          Grace Carney recently described as "data springs"
        </a>{" "}
        - those perfect insertion points where valuable data begins to flow
        effortlessly. When we look at which AI tools are gaining the most
        traction, it's those that have found their natural place in existing
        workflows.
      </p>

      <h2 style={{ fontSize: "1.75rem", marginTop: "2rem" }}>
        LLM Usage Across Teams
      </h2>
      <PieChartSection data={llmUsage} />

      <p>
        ChatGPT has emerged as the leading general-purpose LLM, with 70% of
        teams incorporating it into their workflow. Most teams report using it
        as an on-demand pair programming partner, helping to answer questions
        and work through technical challenges. Claude is used by 15% of teams,
        while the remaining 15% haven't adopted a general-purpose LLM.
      </p>

      <h2 style={{ fontSize: "1.75rem", marginTop: "2rem" }}>
        Writing Code Tool Adoption
      </h2>
      <BarChartSection data={writingCode} />

      <p>
        GitHub Copilot shows the highest adoption rate among all tools surveyed,
        with 86% of teams using it for code writing. Cursor follows as the
        second most adopted tool, used by 11 teams. Several teams use multiple
        code writing tools in combination, particularly Copilot alongside
        Cursor.
      </p>

      <h2 style={{ fontSize: "1.75rem", marginTop: "2rem" }}>
        Code Search Tools
      </h2>
      <PieChartSection data={codeSearch} />

      <p>
        For code search, Cursor leads adoption with 9 teams actively using it.
        One team uses Sourcegraph, while 17 teams haven't yet adopted AI-powered
        code search tools. The data suggests this category is still in early
        stages of adoption compared to code writing tools.
      </p>

      <h2 style={{ fontSize: "1.75rem", marginTop: "2rem" }}>
        Frontend Prototyping Adoption
      </h2>
      <PieChartSection data={frontendPrototyping} />

      <p>
        Frontend prototyping shows emerging tool adoption, with three teams
        using Vercel's AI features and two using Claude. The majority of teams
        (23) haven't yet incorporated AI tools into their frontend prototyping
        workflow.
      </p>

      <h2 style={{ fontSize: "1.75rem", marginTop: "2rem" }}>
        Testing Tools Adoption
      </h2>
      <PieChartSection data={testingCode} />

      <p>
        In testing, two teams have begun experimenting with AI tools: one using
        QA Wolf and another using Testrigor. Another team is exploring Ranger,
        noting its potential to replace traditional testing approaches.
      </p>

      <h2 style={{ fontSize: "1.75rem", marginTop: "2rem" }}>
        Documentation Tools Adoption
      </h2>
      <PieChartSection data={documentation} />

      <p>
        For documentation, we see early exploration with Mintlify and ChatGPT by
        two separate teams.
      </p>

      <p>
        Looking at the broader picture, we see clear patterns in where AI tools
        have gained traction. Code writing tools, particularly Copilot, show the
        highest adoption rates. General-purpose LLMs are widely used, while
        specialized tools for specific tasks like frontend prototyping are still
        in early adoption phases.
      </p>

      <p>
        The data tells a clear story: AI tools that seamlessly integrate into
        existing workflows are winning. But we're still in the early innings.
        Most specialized development tasks - testing, documentation, maintenance
        - remain largely untouched by AI. There seems to be a looming question
        of whether there is an opportunity for startups in these usage gaps, or
        whether these applications will ultimately become features within the
        larger incumbents.
      </p>

      <p>
        Stay tuned as we expand this survey across other crucial business
        functions and tell the story of the ways AI is (and isn't) reshaping the
        way we work.
      </p>

      <hr
        style={{
          margin: "3rem 0",
          border: "none",
          borderTop: "1px solid #E6E6E6",
        }}
      />

      <div
        style={{
          backgroundColor: "#f8f9fa",
          padding: "2rem",
          borderRadius: "8px",
          marginTop: "3rem",
        }}
      >
        <h2
          style={{
            fontSize: "1.5rem",
            marginBottom: "1rem",
            fontWeight: 600,
          }}
        >
          About This Post
        </h2>

        <p>
          This entire post, including the data visualization and analysis, was
          created using Claude. Here's the general workflow we followed:
        </p>

        <ol
          style={{
            marginLeft: "1.5rem",
            marginTop: "1rem",
            listStyleType: "decimal",
          }}
        >
          <li style={{ marginBottom: "0.75rem" }}>
            Raw survey data was collected via Google Forms
          </li>
          <li style={{ marginBottom: "0.75rem" }}>
            Data cleaning and initial analysis was performed with Claude's help
          </li>
          <li style={{ marginBottom: "0.75rem" }}>
            Visualizations were created using React and Recharts, with Claude
            generating all the component code
          </li>
          <li style={{ marginBottom: "0.75rem" }}>
            The narrative was iteratively refined through conversation with
            Claude, drawing insights from the data
          </li>
          <li style={{ marginBottom: "0.75rem" }}>
            USV's style guide was incorporated to ensure consistent branding
          </li>
          <li style={{ marginBottom: "0.75rem" }}>
            Claude provided step-by-step guidance for deploying the
            visualization in CodeSandbox, making it easy to test and refine the
            implementation
          </li>
        </ol>

        <p style={{ marginTop: "1.5rem" }}>
          The entire process took place within Claude's interface, demonstrating
          how AI can assist in creating data-rich content while maintaining
          brand consistency and narrative quality. If you're interested in
          replicating this approach, the key is to break down the process into
          clear steps: data preparation, visualization design, narrative
          development, and styling.
        </p>
      </div>
    </article>
  );
};

export default BlogPost;
