export function saveToLocal(id, key, value) {
  let seller = window.localStorage.__seller__;
  if (!seller) {
    seller = {};
    seller[id] = {};
    seller[id][key] = value;
  } else {
    seller = JSON.parse(seller);
    if (!seller[id]) {
      seller[id] = {};
    }
  }
  seller[id][key] = value;
  localStorage.__seller__ = JSON.stringify(seller);
}

export function loadFromLocal(id, key, def) {
  // 先获取localStorage的对象
  let seller = window.localStorage.__seller__;
  // 如果没有存储过就直接返回默认值
  if (!seller) {
    return def;
  }
  // 如果有存储就先根据id来获取存储的数据
  seller = JSON.parse(seller)[id];
  // 能否获取到id所对应的数据，取不到直接返回默认值
  if (!seller) {
    return def;
  }
  // 获取到id所对应的数据，然后获取key所对应的数据
  let ret = seller[key];
  // key对应的有数据就返回，没有对应的就返会默认值
  return ret || def;
}
