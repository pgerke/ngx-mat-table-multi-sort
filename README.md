# ngx-mat-table-multi-sort

An Angular library that adds multi-sort capability to the Angular Material table.

[![Continuous Integration](https://github.com/pgerke/ngx-mat-table-multi-sort/actions/workflows/ci.yml/badge.svg)](https://github.com/pgerke/ngx-mat-table-multi-sort/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/pgerke/ngx-mat-table-multi-sort/graph/badge.svg?token=MDIEOFNUYR)](https://codecov.io/gh/pgerke/ngx-mat-table-multi-sort)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=pgerke_ngx-mat-table-multi-sort&metric=alert_status&token=1114974e75c8639e88919fd32d36163e5c3c851c)](https://sonarcloud.io/summary/new_code?id=pgerke_ngx-mat-table-multi-sort)
![Dependencies](https://img.shields.io/librariesio/release/npm/ngx-mat-table-multi-sort)
![npm](https://img.shields.io/npm/v/ngx-mat-table-multi-sort)
![License](https://img.shields.io/github/license/pgerke/ngx-mat-table-multi-sort)

## Features

- Extend the Angular Material Table to support multiple sorting
- Supports Angular 19. Supporting all actively supported Angular versions is planned (see [#4](https://github.com/pgerke/ngx-mat-table-multi-sort/issues/4) and [#5](https://github.com/pgerke/ngx-mat-table-multi-sort/issues/5))
- Batteries included: The repository contains a demo application that can help you integrate the library with your project
- 100% covered by automated unit tests and secured by static code analysis

## How to use this library

**Prerequisite:** You have created an application using a supported version of Angular and Angular Material

1. In your Angular application run `npm install ngx-mat-table-multi-sort` to add the library to your dependencies
1. In the template, replace the `matSort` directive with the `matMultiSort` directive.
1. Also replace the `mat-sort-header` directive with the `mat-multi-sort-header` directive in the column definitions.
1. In the component definition use `MatMultiSortTableDataSource<T>` as your datasource type instead of `MatTableDataSource<T>`.
1. Also change the type of the sorter from `MatSort` to `MatMultiSortDirective`
1. If you are using standalone components, add the `MatMultiSortDirective` and `MatMultiSortHeaderComponent` to your component's imports array. Otherwise add them to the NgModule that declares your component.
1. Done! 🎉

Enjoy multi-sorting your Angular Material data table!

## Demo

The demo application is hosted on [GitHub pages](https://pgerke.github.io/ngx-mat-table-multi-sort/). You can also clone the repository and run the demo locally.

1. Clone the repository to your local machine
1. Run `npm install` to restore the dependencies
1. Start the demo application by running `npm run start:demo`
1. When compilation is completed, the application is running on `http://localhost:4200`

## License

The project is subject to the MIT license unless otherwise noted. A copy can be found [here](./LICENSE.md).

## Changelog

Please refer to the [changelog](./CHANGELOG.md) document or the [release notes](https://github.com/pgerke/ngx-mat-table-multi-sort/releases) in GitHub.

## I found a bug, what do I do?

We are happy to hear any feedback regarding the library or it's implementation, be it critizism, praise or rants. Please create a [GitHub issue](https://github.com/pgerke/ngx-mat-table-multi-sort/issues) if you would like to contact us.

We would especially appreciate, if you could report any issues you encounter while using the library. Issues we know about, we can probably fix.

If you want to submit a bug report, please check if the issue you have has already been reported. If you want to contribute additional information to the issue, please add it to the existing issue instead of creating another one. Duplicate issues will take time from bugfixing and thus delay a fix.

While creating a bug report, please make it easy for us to fix it by giving us all the details you have about the issue. Always include the version of the library and a short concise description of the issue. Besides that, there are a few other pieces of information that help tracking down bugs:

- The system environment in which the issue occurred (e.g. node version)
- Some steps to reproduce the issue, e.g. a code snippet
- The expected behaviour and how the failed failed to meet that expectation
- Anything else you think we might need

## I have a feature request, what do I do?

Please create a [GitHub issue](https://github.com/pgerke/ngx-mat-table-multi-sort/issues)!

## Acknowledgements

This library was inspired by the work in [ngx-multi-sort-table](https://github.com/Maxl94/ngx-multi-sort-table). While it was created from scratch and is an independent implementation tailored to specific use cases, their ideas and approach provided valuable guidance in its creation. Many thanks for their contributions to the open-source community!

<hr>

Made with ❤️ by [Michaela Andermann](https://github.com/michix99) and [Philip Gerke](https://github.com/pgerke)
