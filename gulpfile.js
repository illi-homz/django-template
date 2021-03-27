// let project_folder = 'dist';
let project_folder = 'static';
let source_folder = 'assets';
let images_folder = 'images';
let media_folder = 'media';

let fs = require('fs');

let path = {
    build: {
        css: `./${project_folder}/css`,
        js:  `./${project_folder}/js`,
        img: `./${project_folder}/img`,
        images: `${media_folder}/`,
        fonts: `./${project_folder}/fonts`
    },
    src: {
        css: `./${source_folder}/scss/style.scss`,
        js:  `./${source_folder}/js/script.js`,
        img: `./${source_folder}/img/**/*.{jpg,png,svg,gif,ico,webp}`,
        images: `${images_folder}/**/*.{jpg,png,svg,gif,ico,webp}`,
        fonts: `./${source_folder}/fonts/*.{ttf,eot,woff,woff2}`
    },
    watch: {
        css: `${source_folder}/**/*.scss`,
        js:  `${source_folder}/**/*.js`,
        img: `${source_folder}/**/*.{jpg,png,svg,gif,ico,webp}`,
        images: `${images_folder}/**/*.{jpg,png,svg,gif,ico,webp}`
    },
    clean: `./${project_folder}/`
}

const {src, dest} = require('gulp'),
    gulp = require('gulp'),
    fileinclude = require('gulp-file-include'),
    del = require('del'),
    scss = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    group_media = require('gulp-group-css-media-queries'),
    clean_css = require('gulp-clean-css')
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify-es').default,
    babel = require('gulp-babel'),
    imagemin = require('gulp-imagemin'),
    webp = require('gulp-webp'),
    webpcss = require('gulp-webp-css'),
    svgSprite = require('gulp-svg-sprite'),
    wait = require('gulp-wait')


function css() {
    return src(path.src.css)
        .pipe(wait(1000))
        .pipe(fileinclude())
        .pipe(scss({
            outputStyle: "expanded"
        }))
        .pipe(group_media()) // группирует медиа запросы
        .pipe(autoprefixer({ // добавляет вендорные префиксы
            overrideBrowserslist: ["last 5 versions"],
            cascade: true
        }))
        .pipe(webpcss())
        .pipe(dest(path.build.css))
        .pipe(clean_css())
        .pipe(rename({
            extname: ".min.css"
        }))
        .pipe(dest(path.build.css));
}

function js() {
    return src(path.src.js)
        .pipe(fileinclude({
            basepath: '@root',
            prefix: '~~'
        }))
        .pipe(babel({ // изменение кода для старых браузеров
            ignore: [
                "node_modules/**"
            ],
            presets: [
                [
                    "@babel/preset-env",
                    {
                        "modules": false,
                        "targets": {
                            "esmodules": true
                        }
                    }
                ]
            ],
            sourceMap: false,
            plugins: [
                "@babel/plugin-proposal-class-properties",
            ]
        }))
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(rename({
            extname: ".min.js"
        }))
        .pipe(dest(path.build.js));
}

function images() {
    return src(path.src.img)
        .pipe(webp({
            quality: 90,
        }))
        .pipe(dest(path.build.img))
        .pipe(src(path.src.img))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            interlaced: true,
            optimizationLevel: 6 // 0 to 7
        }))
        .pipe(dest(path.build.img));
}

function imagesDjango() {
    return src(path.src.images)
        .pipe(webp({
            quality: 90,
        }))
        .pipe(dest(path.build.images))
        .pipe(src(path.src.images))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            interlaced: true,
            optimizationLevel: 6 // 0 to 7
        }))
        .pipe(dest(path.build.images));
}

gulp.task('svgSprite', () => {
    return gulp.src([source_folder + '/iconsprite/*.svg'])
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: "../networks/networks.svg", // sprite file name
                    // example: true
                }
            }
        }))
        .pipe(dest(path.build.img))
})

function fonts() {
    return src(path.src.fonts)
        .pipe(dest(path.build.fonts))
}

function watchFiles() {
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
    gulp.watch([path.watch.images], imagesDjango);
}

function clean() {
    return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(fonts, images, imagesDjango, js, css)); // функции кот должны выполняться
let watch = gulp.parallel(build, watchFiles);

exports.imagesDjango = imagesDjango;
exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.build = build;
exports.watch = watch;
exports.default = watch;
