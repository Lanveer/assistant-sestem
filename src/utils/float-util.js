const FloatUtil = {
  pointIndexOf: function(val) {
    val = val + '';
    const i = val.indexOf('.');
    if (i > -1) {
      return val.length - i - 1;
    }

    return 0;
  },
  pointNums: function(args) {
    args = [].concat(args);
    let nums = [];
    for (let i = 0; i < args.length; i++) {
      let num = args[i];
      let index = FloatUtil.pointIndexOf(num + '');
      nums.push(index);
    }
    return nums;
  },
  pointMaxNum: function(args) {
    args = [].concat(args);
    return Math.max.apply(null, args);
  },
  pointSum: function(args) {
    let total = 0;
    let i = 0;
    let l = args.length;
    while (i < l) {
      total += args[i++];
    }
    return total;
  }
};

const FloatMath = {
  add: function() {
    let args = arguments;
    args = Array.prototype.slice.call(args);

    let m = FloatUtil.pointMaxNum(FloatUtil.pointNums(args));
    let p = Math.pow(10, m);
    let total = 0;
    let i = 0;
    let l = args.length;
    while (i < l) {
      let num = args[i++];
      num = num + '';
      total += FloatMath.mul(Number(num), p);
    }

    return total ? Number(total / p.toFixed(m)) : total;
  },
  sub: function() {
    let args = arguments;
    args = Array.prototype.slice.call(args);

    let m = FloatUtil.pointMaxNum(FloatUtil.pointNums(args));
    let p = Math.pow(10, m);
    let total = Math.round(FloatMath.mul(args[0], p));
    let i = 1;
    let l = args.length;
    total = Number((total + '').replace('.', ''));
    while (i < l) {
      let num = args[i++];
      num = num + '';
      total -= Math.round(FloatMath.mul(Number(num), p));
    }

    return total ? Number(total / p.toFixed(m)) : total;
  },
  mul: function() {
    let args = arguments;
    args = Array.prototype.slice.call(args);
    let l = args.length;
    if (!l) {
      return 0;
    }
    if (l === 1) {
      return Number(args[0]);
    }

    let m = FloatUtil.pointSum(FloatUtil.pointNums(args));
    let p = Math.pow(10, m);
    let total = 1;
    let i = 0;
    while (i < l) {
      let num = args[i++] + '';
      num = Number(num.replace('.', ''));
      total *= num;
    }

    return total ? Number(total / p.toFixed(m)) : total;
  },
  div: function() {
    let args = arguments;
    args = Array.prototype.slice.call(args);

    let n1 = args[0] || 0;
    let i = 1;
    let l = args.length;

    while (i < l) {
      let n2 = args[i++];
      let p1 = FloatUtil.pointNums(n1)[0];
      let p2 = FloatUtil.pointNums(n2)[0];
      //
      n1 = n1 + '';
      n2 = n2 + '';
      n1 = Number(n1.replace('.', ''));
      n2 = Number(n2.replace('.', ''));
      if (!n2) {
        return Number.MAX_SAFE_INTEGER;
      }
      n1 = FloatMath.mul(n1 / n2, Math.pow(10, p2 - p1));
    }

    return n1;
  }
};

export default FloatMath;
