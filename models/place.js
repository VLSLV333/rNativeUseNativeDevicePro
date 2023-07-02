class Place {
  constructor(title, imageUri, address, location) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = location; // {lat: 12.1212, lng: 121.31321}
    this.id = new Date().toString + Math.random().toString();
  }
}
