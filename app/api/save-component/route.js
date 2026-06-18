import fs from "fs";
import path from "path";

export async function POST(req) {
    const {
        componentName,
        componentCode,
        storyCode
    } = await req.json();

    const componentDir = path.join(
        process.cwd(),
        "generated-components",
        componentName
    );

    fs.mkdirSync(componentDir, {
        recursive: true
    });

    fs.writeFileSync(
        path.join(componentDir, `${componentName}.jsx`),
        componentCode
    );

    fs.writeFileSync(
        path.join(componentDir, `${componentName}.stories.jsx`),
        storyCode
    );

    return Response.json({
        success: true
    });
}