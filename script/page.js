import { Console } from 'console';
import fs from 'fs'
import kleur from 'kleur'

const dirName = process.argv[2]; // get directory name from command line argument

if (!dirName) {
    console.error(kleur.red('Error: directory name is missing!'));
    process.exit(1);
}

const lowercase_dirName = dirName.toLowerCase();
const dirPath = `./src/pages/${lowercase_dirName}`;

// check if directory already exists
if (fs.existsSync(dirPath)) {
    console.error(kleur.red(`Error: directory ${dirName} already exists!`));
    process.exit(1);
}

console.log(kleur.green(`Creating directory ${lowercase_dirName}...`));

// create directory
fs.mkdirSync(dirPath);

// create [dirName]layout.tsx file
const layoutContent = `import { Outlet, Link } from "@tanstack/router";

interface ${dirName}LayoutProps {}

export function ${dirName}Layout({}: ${dirName}LayoutProps) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Outlet />
    </div>
  );
}`;

fs.writeFileSync(`${dirPath}/${dirName}Layout.tsx`, layoutContent);
console.log(kleur.green(`Directory ${dirName} layout created successfully!`));


// create dirName.tsx file
const routeContent = `interface ${dirName}Props {}

export function ${dirName}({}: ${dirName}Props) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-[30%]">${dirName}</div>
    </div>
  );
}`;

fs.writeFileSync(`${dirPath}/${dirName}.tsx`, routeContent);
console.log(kleur.green(`Route ${dirName}.tsx created successfully!`));

const configContent = `import { rootLayout } from "@/router/router";
import { Route } from "@tanstack/router";
import { ${dirName} } from "./${dirName}";
import { ${dirName}Layout } from "./${dirName}Layout";

//${dirName} route layout
const ${dirName}RouteLayout = new Route({
    getParentRoute: () => rootLayout,
    path: "/${dirName}",
    component: ${dirName}Layout,
});

//${dirName} default route
const ${dirName}IndexRoute = new Route({
    getParentRoute: () => ${dirName}RouteLayout,
    path: "/",
    component: ${dirName},
});


export const ${lowercase_dirName}Route = ${dirName}RouteLayout.addChildren([
    ${dirName}IndexRoute,
])

`;
fs.writeFileSync(`${dirPath}/config.ts`, configContent);
console.log(kleur.green(`Config ${dirName}.ts created successfully!`));

console.log(kleur.blue("success"));




const filePath = "./src/router/routes.ts";
const targetLine = "// ADD NEW IMPORT HERE";
const newLine = `import { ${lowercase_dirName}Route } from "@/pages/${lowercase_dirName.toLowerCase()}/config";`;
const targetArrayLine = "export const routes = [";
const newArrayLine = `${lowercase_dirName}Route,`;

fs.readFile(filePath, "utf-8", (err, content) => {
  if (err) throw err;

  const lines = content.split("\n");

  const targetIndex = lines.findIndex((line) =>
    line.includes(targetLine)
  );
  if (targetIndex === -1) {
    console.error(
      `Target line '${targetLine}' not found`
    );
    return;
  }

// add route import statement 
  lines.splice(targetIndex, 0, newLine);

// check for routes array
  const targetArrayIndex = lines.findIndex((line) => line.includes(targetArrayLine));
  if (targetArrayIndex === -1) {
    console.error(`Target line '${targetArrayLine}' not found`);
    return;
  }
// add new route into array
lines.splice(targetArrayIndex + 1, 0, newArrayLine);
  
const finalContent = lines.join("\n");


  fs.writeFile(
    filePath,
    finalContent,
    "utf-8",
    (err) => {
      if (err) throw err;
      console.log(
        `Added new line '${newLine}' above line '${targetLine}' in file '${filePath}'`
      );
    }
  );


});
