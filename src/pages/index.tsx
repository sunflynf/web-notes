import { JSX } from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import CodeBlock from "@theme/CodeBlock";
import DockTabs from "@site/src/components/DockTabs";
import HomepageIndex, {
  StartHere,
  useDocs,
} from "@site/src/components/HomepageIndex";

import styles from "./index.module.css";

const REPO = "https://api.github.com/repos/facebook/docusaurus";

const samples = [
  {
    key: "js",
    label: "JavaScript",
    title: "fetch, Node 18+ or any browser",
    language: "js",
    code: `const res = await fetch("${REPO}");
if (!res.ok) throw new Error(\`HTTP \${res.status}\`);

const repo = await res.json();
console.log(repo.stargazers_count);`,
  },
  {
    key: "java",
    label: "Java",
    title: "java.net.http.HttpClient with Jackson, Java 11+",
    language: "java",
    code: `var client = HttpClient.newHttpClient();
var request = HttpRequest.newBuilder(URI.create("${REPO}")).build();
var response = client.send(request, HttpResponse.BodyHandlers.ofString());

var repo = new ObjectMapper().readTree(response.body());
System.out.println(repo.get("stargazers_count"));`,
  },
  {
    key: "csharp",
    label: "C#",
    title: "HttpClient with System.Net.Http.Json, .NET 6+",
    language: "csharp",
    code: `using var http = new HttpClient();
http.DefaultRequestHeaders.UserAgent.ParseAdd("web-notes"); // GitHub requires one

var repo = await http.GetFromJsonAsync<JsonElement>("${REPO}");
Console.WriteLine(repo.GetProperty("stargazers_count"));`,
  },
  {
    key: "go",
    label: "Go",
    title: "net/http and encoding/json from the standard library",
    language: "go",
    code: `resp, err := http.Get("${REPO}")
if err != nil {
	log.Fatal(err)
}
defer resp.Body.Close()

var repo struct {
	Stars int \`json:"stargazers_count"\`
}
json.NewDecoder(resp.Body).Decode(&repo)
fmt.Println(repo.Stars)`,
  },
  {
    key: "python",
    label: "Python",
    title: "requests",
    language: "python",
    code: `import requests

res = requests.get("${REPO}", timeout=10)
res.raise_for_status()

print(res.json()["stargazers_count"])`,
  },
];

function Hero(): JSX.Element {
  const total = useDocs().length;

  return (
    <header className={styles.hero}>
      <div className="container">
        <Heading as="h1" className={styles.title}>
          Working notes on how the web is built
        </Heading>
        <p className={styles.lede}>
          Reference notes on languages, frameworks, databases and
          infrastructure: short explanations, working code, and comparisons you
          can scan in a minute. {total} notes so far.
        </p>
        <div className={styles.actions}>
          <Link
            className="button button--primary button--lg"
            to="/docs/category/software-technologies"
          >
            Browse the notes
          </Link>
          <Link className="button button--info button--lg" to="/blog">
            Read the blog
          </Link>
          <p className={styles.searchHint}>
            Or press <kbd>Ctrl</kbd> <kbd>K</kbd> to search
          </p>
        </div>

        <div className={styles.index}>
          <HomepageIndex />
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout
      title="Notes on web development"
      description="Reference notes on web development: JavaScript, Java, C#, Go, Python and PHP, their frameworks, databases, Docker and the cloud."
    >
      <Hero />
      <main>
        <section className={styles.section}>
          <div className="container">
            <div className={styles.sectionHead}>
              <Heading as="h2" className={styles.sectionTitle}>
                Code first, in the language you work in
              </Heading>
              <p className={styles.sectionLede}>
                Most notes lead with code you can copy. Where tools overlap,
                they sit side by side, like this request for a GitHub
                repository&apos;s star count.
              </p>
            </div>
            <DockTabs
              tabs={samples.map((sample) => ({
                key: sample.key,
                label: sample.label,
                title: sample.title,
                content: (
                  <CodeBlock language={sample.language} title={sample.title}>
                    {sample.code}
                  </CodeBlock>
                ),
              }))}
            />
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <div className={styles.sectionHead}>
              <Heading as="h2" className={styles.sectionTitle}>
                Start here
              </Heading>
              <p className={styles.sectionLede}>
                Notes that apply whatever stack you use.
              </p>
            </div>
            <StartHere />
          </div>
        </section>
      </main>
    </Layout>
  );
}
