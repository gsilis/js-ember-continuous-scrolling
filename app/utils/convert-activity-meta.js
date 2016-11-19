import Ember from 'ember';

export function convertCollection(collection, markers) {
  markers.reverse().forEach((marker, index) => {
    console.log('ADDING AT ' + marker.at_index);
    const itemIds = marker.ids;
    const accountId = marker.account_id;

    collection.content.splice(marker.at_index, 0, convertItem({ itemIds, accountId }));
  });

  return collection;
}

function convertItem(item) {
  return Ember.Object.create(item, { isGroup: true, getRecord() { return this; } });
}
