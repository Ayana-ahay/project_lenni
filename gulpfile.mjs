import gulp from "gulp";
import del from "del";
import include from "gulp-file-include";
import plumber from "gulp-plumber";
import formatHtml from "gulp-format-html";

import autoprefixer from "autoprefixer";
import less from "gulp-less";
import postcss from "gulp-postcss";
import sortMediaQueries from "postcss-sort-media-queries";

import minify from "gulp-csso";
import rename from "gulp-rename";
import terser from "gulp-terser";

import imagemin from "gulp-imagemin";
import imagemin_gifsicle from "imagemin-gifsicle";
import imagemin_mozjpeg from "imagemin-mozjpeg";
import imagemin_optipng from "imagemin-optipng";
import svgmin from "gulp-svgmin";
import svgstore from "gulp-svgstore";

import server from "browser-sync"; 

const resources = {
    html: "src/html/**/*.html",
    jsDev: "src/scripts/dev/*.js",
    jsVendor: "src/scripts/vendor/*.js",
    less: "src/styles/**/*.less",
    static: [
        "src/assets/icons/**/*.*",
        "src/assets/fonts/**/*.{woff,woff2}"
    ],
    images: "src/assets/images/**/*.{png,jpg,jpeg,webp,gif,svg}",
    svgSprite: "src/assets/svg-sprite/*.svg"
};

function clean() {
    return del("dist");
}

// обработка всех HTML файлов

function includeHtml() {
    return gulp
      .src("src/html/*.html")
      .pipe(plumber())
      .pipe(
        include({
          prefix: "@@",
          basepath: "@file"
        })
      )
      .pipe(formatHtml())
      .pipe(gulp.dest("dist"));
}

// Обработка стилей

function style() {
    return gulp
      .src("src/styles/styles.less")
      .pipe(plumber())
      .pipe(less())
      .pipe(
        postcss([
          autoprefixer({ overrideBrowserslist: ["last 4 version"] }),
          sortMediaQueries({
            sort: "desktop-first"
          })
        ])
      )
      .pipe(gulp.dest("dist/styles"))
      .pipe(minify())
      .pipe(rename("styles.min.css"))
      .pipe(gulp.dest("dist/styles"));
}

// обработка наших js-файлов

function js() {
    return gulp
      .src("src/scripts/dev/*.js")
      .pipe(plumber())
      .pipe(
        include({
          prefix: "//@@",
          basepath: "@file"
        })
      )
      .pipe(gulp.dest("dist/scripts"))
      .pipe(terser())
      .pipe(
        rename(function (path) {
          path.basename += ".min";
        })
      )
      .pipe(gulp.dest("dist/scripts"));
}

// копирует без какой либо обработки js-файлы, лежащие в resources.jsVendor и сохраняет в dist/scripts/.
function jsCopy() {
    return gulp
      .src(resources.jsVendor)
      .pipe(plumber())
      .pipe(gulp.dest("dist/scripts"));
}

// Обработка статичных файлов

function copy() {
    return gulp
      .src(resources.static, {
        base: "src"
      })
      .pipe(gulp.dest("dist/"));
}


// Обработка изображений
function images() {
    return gulp
      .src(resources.images)
      .pipe(
        imagemin([
          imagemin_gifsicle({ interlaced: true }),
          imagemin_mozjpeg({ quality: 100, progressive: true }),
          imagemin_optipng({ optimizationLevel: 3 })
        ])
      )
      .pipe(gulp.dest("dist/assets/images"));
}

// автоматическое создание внешнего символьного спрайта.
function svgSprite() {
    return gulp
      .src(resources.svgSprite)
      .pipe(
        svgmin({
          js2svg: {
            pretty: true
          }
        })
      )
      .pipe(
        svgstore({
          inlineSvg: true
        })
      )
      .pipe(rename("symbols.svg"))
      .pipe(gulp.dest("dist/assets/icons"));
}

// Сборка проекта и отслеживание изменений
const build = gulp.series(
    clean,
    copy,
    includeHtml,
    style,
    js,
    jsCopy,
    images,
    svgSprite
);

function reloadServer(done) {
    server.reload();
    done();
}

// Развернем локальный сервер, используя директорию dist, плагин server и новую задачу serve.
function serve() {
    server.init({
      server: "dist"
    });
    gulp.watch(resources.html, gulp.series(includeHtml, reloadServer));
    gulp.watch(resources.less, gulp.series(style, reloadServer));
    gulp.watch(resources.jsDev, gulp.series(js, reloadServer));
    gulp.watch(resources.jsVendor, gulp.series(jsCopy, reloadServer));
    gulp.watch(resources.static, { delay: 500 }, gulp.series(copy, reloadServer));
    gulp.watch(resources.images, { delay: 500 }, gulp.series(images, reloadServer));
    gulp.watch(resources.svgSprite, gulp.series(svgSprite, reloadServer));
}

const start = gulp.series(build, serve);

export {
    clean,
    copy,
    includeHtml,
    style,
    js,
    jsCopy,
    images,
    svgSprite,
    build,
    serve,
    start
};