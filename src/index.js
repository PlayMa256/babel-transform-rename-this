export default function(babel) {
  const { types: t } = babel;

  return {
    visitor: {
      ThisExpression(path) {
        const _thisStatement = t.variableDeclaration("const", [t.variableDeclarator(t.identifier("_this"), t.thisExpression())]);
        const blockStatement = path.findParent(n => n.isBlockStatement());
        const blockBody = blockStatement.node.body;
        const isAlreadyDeclared = blockBody.filter(element => {
          return t.isVariableDeclaration(element, {}) && t.isThisExpression(element.declarations[0].init);
        });
        if (isAlreadyDeclared.length === 0) {
          blockStatement.node.body.unshift(_thisStatement);
        }
        if (!t.isCallExpression(path.parent)) {
          path.replaceWith(t.identifier("_this"));
        }
      }
    }
  };
}
