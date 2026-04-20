#!/usr/bin/env python3
"""
Dedupe Cursor asset PNGs (same stem, __N_- / - uuid suffixes), keep largest per stem,
export JPEGs to match `lib/itemPhotoPath.ts`:
  - bag / shoes / boots → public/products/labeled/{category}-{slug}.jpg
  - everything else → public/Phia clothing/{category}-{slug}.jpg

Run from repo root: python3 scripts/sync-product-photos.py
"""
from __future__ import annotations

import re
import shutil
import subprocess
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
ASSETS = Path.home() / ".cursor/projects/Users-tisealatise-Documents-Github-projects-phia-hack-apr26/assets"
DEST_PHIA_CLOTHING = REPO / "public" / "Phia clothing"
DEST_LEGACY_LABELED = REPO / "public" / "products" / "labeled"
LEGACY_CATEGORIES = frozenset({"bag", "boots", "shoes"})

END = re.compile(
    r"(__\d_-)?(--)?[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.png$",
    re.I,
)


def stem_of(name: str) -> str:
    m = END.search(name)
    s = name[: m.start()] if m else name
    return s.rstrip("-_")


def pixel_wh(path: Path) -> tuple[int, int]:
    out = subprocess.check_output(
        ["sips", "-g", "pixelWidth", "-g", "pixelHeight", str(path)],
        text=True,
        stderr=subprocess.DEVNULL,
    )
    w = h = 0
    for line in out.splitlines():
        if "pixelWidth" in line:
            w = int(line.split(":")[-1].strip())
        if "pixelHeight" in line:
            h = int(line.split(":")[-1].strip())
    return w, h


def pick_winner(paths: list[Path]) -> Path:
    best = paths[0]
    best_key = (-1, -1)
    for p in paths:
        w, h = pixel_wh(p)
        key = (w * h, p.stat().st_size)
        if key > best_key:
            best_key = key
            best = p
    return best


def to_jpeg(src: Path, dest: Path, quality: int = 88) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    tmp = dest.with_suffix(".tmp.png")
    shutil.copy2(src, tmp)
    subprocess.run(
        ["sips", "-s", "format", "jpeg", "-s", "formatOptions", str(quality), str(tmp), "--out", str(dest)],
        check=True,
        capture_output=True,
    )
    tmp.unlink(missing_ok=True)


# Longest prefix first: (stem_prefix, folder_category, filename_slug)
# Labels verified against image content (see git history / product QA).
# folder_category: outerwear | boots | shoes | bottom | top | bag | accessory
LABELED: list[tuple[str, str, str]] = [
    ("l37HHJuQipbyP5_IjuAhmJxIKpoc.QWFBTl3xW4LrL.Tw__GIy6rNykNex2ykpMFrL9ZS1q_W3TYd82G6Mg6ReA0uaekDjWh5QinNz3JC3GLDzbL", "outerwear", "wrap-knit-shawl-oatmeal"),
    ("cltju05Ok.24f6r770YU2FSS3z8Y5niAXnaerypo7N6S9TfSMgRPR440.hkalVt4fRvYRCk8IoFVQDghmMUr6FWeM8vBsGRXW2tZ2rCkxG2Yve6GwapgX5hfvEql3LgIDUNgT5LCvAutiarrnRZZDbnI", "bottom", "jeans-wide-leg-loafers"),
    ("mSPNrlq_X7CfvDBxRv5VybAJhdWVsrCansDAtHqOV_J8CwraGwNPcOV7EJ0h6NdTh84lT6Db1cZQRd7gMZlYUVhcBX89l5O_hNK0ohuf7HU_3e_yF8S2sqIjkVwcFPGv0TvMABo6i1tfTmk4t8_K91AdzBKV7rheeDVd2Efo5Ft", "bag", "shoulder-slouch-rust"),
    ("FQJWsCTiV6UmTZdILl_OKgESbvsbkwa1N_0VUoryO244mqqejkNPagJ7hiMv61g6JIJRrVpYHVb1e4QlW5Zo7wxJv_GEMNi3O_dLP3GOfxfbt0F9IIOT", "outerwear", "coat-black-funnel-zip"),
    ("vYkwSByaYFnlAJWVlupZSIdT07s5I7loEeqaR4Y3gofxK59XiQplTmZ858wd7Z2sPK1EFIP8x9TpQJLypa_S3jWEgxydeQ14jO2HLmiMsYAtX1Sm1HMxWRVfI98oFxFcY0rdJnLAc_3pQf_Tknu2fcQWLLjJbrarWH4O", "accessory", "belt-black-gold-buckle"),
    ("023eS4cG.vJXK_vK2SMx2rWbvUtFD7FI9OIBfGUFLGZArg1bgkbg4IY7OzaRyOoa_3CPi9vbEFcfVK3YSa.unc0hXgJVS0dlXtDrsLr4oxcw87DzZuVulmWR3voQWYrR_j2k6lT__mPYmPRq076aNIxTbLSV_BzEP70GnYFSJFJAylBezuq8UE6UZsoTz.SXrNCvo_k", "top", "shirt-powder-blue-button"),
    ("xt9mRHAgEjxq6TviCh8bFDN9.rkjxDCTF3rFKElEXNLgKMpNJyNkfLGGQCK.3KkKaToxteu01uDZPdlZLgznlcgMI4sG8drLr0l_e7UVZ5XRcbanYLvrSnbPjKcpQOdW83M1hW4Xr5cwY8JnjUPIu4Hf7.J3kEY_OdUrPmZDS0xkJetFm18_PpxriIugMdvkv8painnUZYnsr", "top", "dress-white-shift-vneck"),
    ("9noBxU2BwY8HGrAQx0KhjzA3l2EgB9MKdqy9GpLhaH.8EQ8w6b5WzbwyNdGo_tzbKk.ClOgNLB9LtiwAQLG_zb913NcYu.zhuhwqEhz9W3pC9PbzGNKW4_1.V9oPrzaA.NH6wse6DgoguZ1njXq4_6MvGGUVdPvtQWzCXBmQinvsHVca7tpxLhunxBfcJbqquW4jU", "bottom", "trousers-white-wide-crop"),
    ("N6iyZoHd8N9floFNlWuGUPnhig5MJgCwCFIwn740cgB3C3LyipRH6utkXMa1zty9Zt6.Qqmnw8uB6karDkKy.ftLViPseKFUoVCCxgSMVLKWd2xEuQLWEmLtOXvcjMTCngAbTXWpx_CEpfD6B0FRRFAHJKfj0Ulae_BRx8pPxRCNB.dCiPXWLQcqLKmo3XhnoiadCjzxFbrhPSI", "bottom", "skirt-maxi-satin-champagne"),
    ("mofwXyhaVjJYGoRCGrV3yWYPIH.MxdxLpaO2OlLBGI77JWy4WkBN5I3i.m1QvBkbm1SnIO5iM8THtWaPq0AeO6cNhyiyFTRVjv2o4aszjWHXeR2dp.FeWZYn2tDABXx4ILUXazUpbVaUK7_7Z3LCSQkqdgUNA_SbACaWuQWP_O7QFsffm52qXQKMIWFFY_S1L2w_xR0JJjv", "top", "bodysuit-cream-snaps"),
    ("XzsJuq3qCTDeodILNR.lQLj6Ngjdjwcp1tghxdPUhkGpj38z7FLx.z7gUv7WaFIzrt81N4EE50Y5GB8ojWkxngkhRkVZKrn_5rbKMKUN2kWCQVHnyL6PYeP0cHsFEXBx4n.GASmW9WDe9.TEJeC2sUI9lOcRGIMd2J5qxesuXg1z2gzYdys5LpQ.RqJPJZ5Izi632ZKL44lpo", "shoes", "mule-sarto-beige"),
    ("eaph2fLtLDcgxRXiCgL1XP_dMtRmXa1lAFs6vV0xdE6mKgGLD11.7pF_w6WtDgTxePuyQyKRh_7JhHOUvLl5ptliEaU3jEEnWkn2C8YVBONnbmKJPg4oav0dFCZU4sB7b7h_SyiDIdzoWRUBqrRWQBIAOQwJEQ87W_V2CPJn.22Oq.gkzhHDrOSc4Dfj7KX4wv6IxwwIjUjnX", "top", "knit-sweater-boatneck-brown"),
    ("iMBVOu.lQvP5c.12ZstPN6ACSzA9UrJYQB83XWQ2anmtGmZlnMayTHe.9guW2AdvjwbJDSzqVPBfKemAeX88I26gjaV35YauQhmrP_1_GLJegUC44LgjOxbLu5ELYZ1a41c18pPc2lXiIw0R4DvCOcftxE9n2OM4J0R_FQyBGadYRp5byQEqNQL7hSv4EdO2TV8IhV.mH7t", "outerwear", "blazer-white-open"),
    ("gSfKhMdJLJkeo_RO8dkPUAmn8xlm2zT1oIRaEzAhu6t7JoSlGn2jjO.iPAORkHDImHruAVU06Lfjo1BDuM9zihczXh5U1MkA2Yu3g3kx2TVcwOknlIJCqo.PsYn", "top", "turtleneck-black-with-jeans"),
    ("EX6cxip_eLWIAzeh8uQ3ixfx_N.NFTcLQuPkYYnSfG5Wnc.rtvd.FVKNLcbOCU.YBN_ULbD98BDpFIix6yjDjO9kIxIr02zZ.cQxLG8urSf0HbdLqxJp.900zGVFIKqV5O46K3vPCngO_3y7Kmv_.9dboSwkGNu", "top", "cardigan-ivory-halogen"),
    ("VW8GQh7B9ukQWM4Q0juSW2r9UEdEtr39n5kEa8WZTdjZ.YpyrvUIEoNnfwoXOSs_zPujdVdCDGXN12OVwfLZ61QO35Dv0dPc0c", "boots", "slouch-black-knee-white-skirt"),
    ("7jH4b6X3uARTeSJK4DEoeTfuyGp3HXM7rCDbJRsiZUFiYDpEbApnflJZoAIjql_bo.OS_bjJ0COxOqOE.sLfnaFYVWYZuDRCqrqAbwEi.LnqNnUopwJeI676tRTr82IAc7YJWftx0vQ_6jdoIP.OB.IdlA.ZFjgr8i.XR16L9YNjH8KOz", "top", "blouse-twist-front-tan"),
    ("9OVdWyq5cFmgN4S0kIrCu16Sj0eJuw9cR4r2EEJwj4IdaPxrH6vmqaHwl9CqiP8TMY7qCrgKhbMSeaVCJuFr7J_CqEmHcEUpQfnLnrHEsJu99rdDDf_M8VcWlNeDs8b4yaFLzQY", "top", "outfit-layered-stripe-jeans"),
    ("6BxOqHi.WweO.vlfq1MNngvV.UCKerApj8nUKywdR2oL.SOyLmqatYm2X0JHMsbqA0AG5f6ItYcsNEC_0PhPyCUHGsA3SgZ7VebIDoVdeNKsd3o0F_LF.aNEZ2md4yWP1Cfl6Rt9RMBZuf0sxO1l3PP6.68jUUugMzvspBEyaiv0roPsFxFCFpbSWhfViPT.6niXuIbuDlkTaS", "top", "shirt-white-long-sleeve"),
    ("q7kfkfWdg3nwk5wWnVKbn.dt40VGKyhykCBszvrycOeeghGbQRm2LJC5JeHHkITGPlcjHOhf2El9dBnMImD3bXah0nRx.U00cpzKoQhGoYGiAmJU4T3xqNpajvHScYrXiolOr.viNLfFLOpRMs9uK.9zHacXvM9kYL1SWYpKcPKBzWbnwlil", "bottom", "trousers-black-pleated"),
    ("Xs6VdDx9Cbyh", "bottom", "leggings-black-studio"),
    ("ySwRKlg2sGH7Ko_S_pRpxZXHZd2m2L5C7c7PnmZLXkoC2QFroNVcwr_v0nuPzv2kqwV9oH", "shoes", "pump-beige-stiletto"),
    ("V9I1y_jOdirPSd3WWhu7mDsinSOsmAlJGDwPJJM14UuJNnnfTDbUkBQVoDXYIbxw2dYHMt6GxF_QsqqjIphIVVTsi_1ysW", "outerwear", "wrap-coat-full-body"),
    ("L.Uzt0SYdAKcD.ilD8FEi2qAbRnxCabaQ.0v.Rwis_IxTFOfmK9ECfscRmc5znz4mvLCMmG9mP2PbOA_wejU0msmUNUZKyD7yU91SFO_wY3rrwvzkd89ZI68QK8rMma5vSmXAprFmD5pD_tAB8BqbcwgkTTowIJhquTr1gXje7qE6W5.BMJXKf", "bag", "tote-cognac-pebble-leather"),
    ("l8gG8mjyXMDJxzEZoYR_wGMUg.up84XgQ_8fYxsrmUDtEb2.zGN2On_zzWTdsro8D0i_e4KVzDNjlwWLH1it1.F3sGgcPtV9I4.kvnZQVM1uN_gNHpihTrwk72gaindDKbkYVnonTBf4nhCnfSArY7TDt0MI8Zx0Xh0cwOD_u8ljjHhd8Q.Df81kKNH", "bottom", "trousers-cream-pleated-belt"),
    ("q_7vhWCvk4Nkvtm34V9Mh1cXJGsx_0Oa_f6MIlULDEodnXv0IIjiuh", "top", "rib-tee-white-denim-cargo"),
    ("i8TFGHIs0rBgMy5md1X0vdoZ", "top", "blouse-wrap-cream"),
    ("zd8NM1wca69xSZqpyg0dG9EhQ_ydA5UIvTlv8.fOPW_h69SAV1ozxhFe1o4IQhrJoBX6LP4.cUK6Xpv6dkjIlxZlQfzEIURFPpRQl5eNzdMAav", "outerwear", "blazer-camel-on-model"),
    ("DbWFQ6l0QjD8dcdFhkTMGt7rUiVIJ9QxzA_YFITcesKG2thSplVzqF5NHqOUvXRMkT8DuhoBR840iZ0F6vcyCpwZ8I4LhNCFVuc", "top", "dress-shirt-stripe-tie-waist"),
    ("RVLhdgh4idAnLvER1ckqGzUM2SK99zqG7O.rJxJPnxQhiAvVE", "boots", "chelsea-platform-brown"),
    ("PuVdmWGoPpUbIEsetdVfNqHRVdvdXSVieZHCCrLwFzPPtWijnTBQkoKpzYnsjWGFyH7Eh_4Az48.1vPRW7uIsQRThOlhcTPp8amojVx.0Cm4W", "accessory", "beanie-rib-oatmeal"),
    ("g8vpEDGOW0YXgPXctAbyLBEqWCIJC7mEA05GybeaO9_W2856895Mlu6lQfKlNw2kxd4MNc807R7zreaGmwr90lj_riUufV6bC7Qe2L_m0MDwAbOCIuSOOQMbU17DHsfsAzVIwZ9FIr1muuX", "shoes", "loafer-horsebit-tan-suede"),
    ("VMK8Yx5zkTN6t2Fm0SJje_y6jYQWXUKVV.WFcXSFKIxx0mcJbBtz_PBjvY6jXrRY2ibss5Mpjcu1.uLJll", "accessory", "sunglasses-tortoise-diff"),
    ("gH4an2LcDK693_dKInrCLyr5tIRXTsSihuEoktREYvyI8aw45gdOzzZ4JOrQ6.nE5F1tCd37IGnSEDVpIUVmIbOLDiuVBuMc", "boots", "ankle-suede-brown-kitten"),
    ("2.v67kgH518Ar.N1vqMX8uveIRgC1b8cX6fYUEPh.wmaUPHNWpnCwvKAg3EeZna20SRW1dkKuBwmeE1FJa8qjrrD.LcR4d0_r0i.dlp3nr7UmsPyweuMc_r.5covfcwdqIHacoyXdYBPhP90XL_IC1iwhWl2eN01jwbWfwpUctcNoS4iiAYu5xTYzw", "top", "tank-ruffle-pink-express"),
    ("_x_FdWhv1WqWs.agKBQCMJMyKjuM2w6pMqzH_pKMGZJj.IZmfvVviJqLL9Djf.jHwYgvqPP5P0Nl", "top", "sweater-turtleneck-charcoal"),
]

# item id -> basename (no path, no ext); resolved under labeled/ or Phia clothing/ per category.
# Keep in sync with `ITEM_LABELED` in `lib/itemPhotoPath.ts`.
ITEM_EXPORT: dict[int, str] = {
    1: "shoes-mule-sarto-beige",
    2: "bag-tote-cognac-pebble-leather",
    3: "outerwear-blazer-white-open",
    4: "boots-slouch-black-knee-white-skirt",
    5: "bag-shoulder-slouch-rust",
    6: "bottom-trousers-white-wide-crop",
    7: "top-cardigan-ivory-halogen",
    8: "top-rib-tee-white-denim-cargo",
    9: "top-bodysuit-cream-snaps",
    10: "top-blouse-wrap-cream",
    11: "outerwear-wrap-knit-shawl-oatmeal",
    12: "boots-chelsea-platform-brown",
}


def resolve_winners() -> dict[str, Path]:
    if not ASSETS.is_dir():
        raise SystemExit(f"Missing assets dir: {ASSETS}")
    files = [
        p
        for p in ASSETS.iterdir()
        if p.suffix.lower() == ".png" and not p.name.startswith("CleanShot") and p.stat().st_size > 100
    ]
    groups: dict[str, list[Path]] = {}
    for p in files:
        groups.setdefault(stem_of(p.name), []).append(p)
    return {st: pick_winner(ps) for st, ps in groups.items()}


def main() -> None:
    winners = resolve_winners()
    DEST_PHIA_CLOTHING.mkdir(parents=True, exist_ok=True)
    DEST_LEGACY_LABELED.mkdir(parents=True, exist_ok=True)
    for stale in DEST_PHIA_CLOTHING.glob("*.jpg"):
        stale.unlink()
    for stale in DEST_LEGACY_LABELED.glob("*.jpg"):
        stale.unlink()

    written: set[str] = set()
    for prefix, category, slug in LABELED:
        match = next((st for st in winners if st.startswith(prefix)), None)
        if not match:
            print(f"skip (no stem): {category}/{slug}")
            continue
        src = winners[match]
        name = f"{category}-{slug}.jpg"
        dest_root = DEST_LEGACY_LABELED if category in LEGACY_CATEGORIES else DEST_PHIA_CLOTHING
        dest = dest_root / name
        to_jpeg(src, dest)
        written.add(name)
        print(f"ok {dest_root.name}/{name} <- {src.name[:48]}…")

    for item_id, base in ITEM_EXPORT.items():
        name = f"{base}.jpg"
        if name not in written:
            raise SystemExit(f"ITEM_EXPORT {item_id} -> {name} was not produced")

    print("done jpgs:", len(written), "catalog heroes verified:", len(ITEM_EXPORT))


if __name__ == "__main__":
    main()
