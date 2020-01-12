function shouldAddBlankLine(statementPath) {
  const current = statementPath.getNode();
  const parent = statementPath.getParentNode();

  const children = parent.body || parent.consequent;
  const indexInParent = children.findIndex(node => node === current);
  const next = children[indexInParent + 1];

  if (!next) {
    return false;
  }

  if (next.type === "ReturnStatement") {
    return true;
  }

  const currentCall = getCallExpression(current);
  const nextCall = getCallExpression(next);

  if (currentCall) {
    const currentFunctionName = getFunctionName(currentCall);
    if (currentFunctionName.startsWith("use")) {
      return !nextCall || currentFunctionName !== getFunctionName(nextCall);
    }
  }

  return false;
}

function getCallExpression(statement) {
  if (
    statement.type === "VariableDeclaration" &&
    statement.declarations[0] &&
    statement.declarations[0].init &&
    statement.declarations[0].init.type === "CallExpression"
  ) {
    return statement.declarations[0].init;
  }

  if (
    statement.type === "ExpressionStatement" &&
    statement.expression.type === "CallExpression"
  ) {
    return statement.expression;
  }
}

function getFunctionName(callExpression) {
  const { callee } = callExpression;

  if (callee.type === "MemberExpression") {
    return callee.property.name;
  } else {
    return callee.name;
  }
}

module.exports = {
  shouldAddBlankLine
};
