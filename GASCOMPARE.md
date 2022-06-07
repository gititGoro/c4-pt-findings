# How to compare gas before and after

In order to compare gas improvements, we need to first generate gas numbers on unchanged code. Initially run 

```
yarn gasPrepare
```
It will generate file called "gasReporterOutput.json". Rename this to gasReporterOutput_base.json. This will be our baseline file.

After this, make the changes you suspect improve gas and run 

```
yarn gasCompare
```

## Optional

In package.config, you'll notice command line arguments on gasCompare of -w 1. This is a weighting parameter. It's not necessary to change this but if you'd like to weight your output, set it to any positive integer. It simply multiplies the results by that number.


## Warning
This isn't battle tested. Always trust your intuition and review the numbers manually if something looks off.