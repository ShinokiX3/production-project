import { Node, Project, SyntaxKind } from 'ts-morph';

const removedFeatureName = process.argv[2];
const featureState = process.argv[3];

if (!removedFeatureName) throw new Error('Укажите название фичи');
if (!featureState) throw new Error('Укажите состояние фичи');
if (featureState !== 'on' && featureState !== 'off') throw new Error('Укажите корректное состояние фичи');

const project = new Project({});

project.addSourceFilesAtPaths('src/**/ArticleDetailsPage.tsx');

// project.addSourceFilesAtPaths('src/**/*.ts');
// project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();

function isToggleFunction (node: Node): boolean {
    let isToggleFeature = false;
    node.forEachChild(child => {
        if (child.isKind(SyntaxKind.Identifier) && child.getText() === 'toggleFeatures') {
            isToggleFeature = true;
        }
    })
    return isToggleFeature;
}

files.forEach((sourceFile) => {
    sourceFile.forEachDescendant(node => {
        if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
            const objectOptions = node.getFirstDescendantByKind(SyntaxKind.ObjectLiteralExpression);
            if (!objectOptions) return;

            const onFuntionProperty = objectOptions.getProperty('on');
            const offFuntionProperty = objectOptions.getProperty('off');
            
            const featureNameProperty = objectOptions.getProperty('name');
            
            const onFuntion = onFuntionProperty?.getFirstDescendantByKind(SyntaxKind.ArrowFunction);
            const offFuntion = offFuntionProperty?.getFirstDescendantByKind(SyntaxKind.ArrowFunction);
            const featureName = featureNameProperty?.getFirstDescendantByKind(SyntaxKind.StringLiteral)?.getText().slice(1, -1);
        
            if (featureName !== removedFeatureName) return;

            if (featureState === 'on') {
                node.replaceWithText(onFuntion?.getBody().getText() ?? '');
            } else if (featureState === 'off') {
                node.replaceWithText(offFuntion?.getBody().getText() ?? '');
            }
        }
    })
})

project.save();
