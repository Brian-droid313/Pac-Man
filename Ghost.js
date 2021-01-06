class Ghost 
{
    constructor(name, startLocation, speed) 
    {
        this.name = name;
        this.startLocation = startLocation;
        this.speed = speed;
        this.currentLocation = startLocation;
        this.isScared = false;
        this.timerId = NaN;
    }
}